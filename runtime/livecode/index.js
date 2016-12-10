var log = require('../../log').logger('livecode');

var T_RENEW = 500;
var SAFETY_FACTOR = 1.25;
var RENEW_SEGMENTS = 15;

function LiveCodeRuntime() {
	this.machine = null;
	this.driver = null;
}

LiveCodeRuntime.prototype.toString = function() {
	return "[LiveCodeRuntime]";
}

LiveCodeRuntime.prototype.connect = function(machine) {
	this.machine = machine;
	this.driver = machine.driver;
	this.ok_to_disconnect = true;
	this.machine.setState(this, "livecode");
	this.moving = false;
	this.keep_moving = false;
	this.current_axis = null;
	this.current_speed = null;
	this.status_handler =  this._onG2Status.bind(this);
	this.completeCallback = null;
	this.driver.on('status',this.status_handler);
};

LiveCodeRuntime.prototype.disconnect = function() {
	if(this.ok_to_disconnect) {
		this.driver.removeListener('status', this.status_handler);
		this._changeState("idle");	
	} else {
		throw new Error("Cannot disconnect while manually driving the tool.");
	}
};

LiveCodeRuntime.prototype._changeState = function(newstate, message) {
	if(newstate === "idle") {
		this.ok_to_disconnect = true;
		var callback = this.completeCallback || function() {};
		this.completeCallback = null;
		callback();
	} else {
		this.ok_to_disconnect = false;
	}
	this.machine.setState(this, newstate, message);
};

LiveCodeRuntime.prototype._limit = function() {
	var er = this.driver.getLastException();
	if(er && er.st == 203) {
		var msg = er.msg.replace(/\[[^\[\]]*\]/,'');
		this.keep_moving = false;
		this.moving = false;
		this.driver.clearLastException();
		this._changeState('stopped', {error : msg});
		return true;
	}
	return false;
}
LiveCodeRuntime.prototype._onG2Status = function(status) {
	switch(status.stat) {
		case this.driver.STAT_INTERLOCK:
		case this.driver.STAT_SHUTDOWN:
		case this.driver.STAT_PANIC:
			return this.machine.die('A G2 exception has occurred. You must reboot your tool.');
			break;
		case this.driver.STAT_ALARM:
			if(this._limit()) { return; }
			break;
	}

	// Update our copy of the system status
	for (var key in this.machine.status) {
		if(key in status) {
			this.machine.status[key] = status[key];
		}
	}

	switch(this.machine.status.state) {
		case "not_ready":
			// This shouldn't happen.
			log.error("WAT.");
			break;

		//TH
		case "livecode":
			if(status.stat === this.driver.STAT_HOLDING && status.stat === 0) {
				this._changeState("paused");
				break;
			}

			if((status.stat === this.driver.STAT_STOP || status.stat === this.driver.STAT_END) && status.hold === 0) {
				this._changeState("idle");
				break;
			}
			break;

		case "paused":
			if((status.stat === this.driver.STAT_STOP || status.stat === this.driver.STAT_END) && status.hold === 0) {
				this._changeState("idle");
				break;
			}
			break;

		case "idle":
			if(status.stat === this.driver.STAT_RUNNING) {
//TH				this._changeState("manual");
				this._changeState("livecode");
				break;
			}
			break;

		case "stopped":
			switch(status.stat) {
				case this.driver.STAT_STOP:			
				case this.driver.STAT_END:
					this._changeState("idle");
					break;
			}
			break;

	}
	this.machine.emit('status',this.machine.status);
};


LiveCodeRuntime.prototype.executeCode = function(code, callback) {
	this.completeCallback = callback;
	log.debug("Recieved livecode command: " + JSON.stringify(code));
	
	// Don't honor commands if we're not in a position to do so
	switch(this.machine.status.state) {
		case "stopped":
			return;
	}

	switch(code.cmd) {
		case 'start':
			this.startMotion(code.axis, code.speed);
			break;

		case 'stop':
			this.stopMotion();
			break;

		case 'maint':
			this.maintainMotion();
			break;

		case 'fixed':
			this.fixedMove(code.x_dist, code.y_dist, code.speed);
			break;

		default:
			log.error("Don't know what to do with '" + code.cmd + "' in livecode command.")
	}
}

LiveCodeRuntime.prototype.maintainMotion = function() {
	this.keep_moving = true;
}

/*
 * Called to set the tool into motion.
 * If the tool is already moving, the flag is set to maintain that motion
 */
LiveCodeRuntime.prototype.startMotion = function(axis, speed) {
	var dir = speed < 0 ? -1.0 : 1.0;
	speed = Math.abs(speed);
	if(this.moving) {
		log.debug("startMotion: Already moving");
		if(axis === this.currentAxis && speed === this.currentSpeed) {
			this.maintainMotion();
		} else {
			// Deal with direction changes here
		}
	} else {
		log.debug("startMotion: Not moving yet.")
		this.currentAxis = axis;
		this.currentSpeed = speed;
		this.currentDirection = dir;
		this.renewDistance = speed*(T_RENEW/60000)*SAFETY_FACTOR;
		this.moving = this.keep_moving = true;
		this.renewMoves();
	}
};

LiveCodeRuntime.prototype.renewMoves = function() {
	if(this.keep_moving) {
		this.keep_moving = false;
		var segment = this.currentDirection*(this.renewDistance / RENEW_SEGMENTS);
		var move = 'G91 F' + this.currentSpeed.toFixed(3) + '\n';
		for(var i=0; i<RENEW_SEGMENTS; i++) {
			move += ('G1 ' + this.currentAxis + segment.toFixed(5) + '\n');
		}
		this.driver.gcodeWrite(move);
		setTimeout(this.renewMoves.bind(this), T_RENEW)		
	} else {
		if(this.machine.status.state != "stopped") {
			this.stopMotion();	
		}
	}
}

LiveCodeRuntime.prototype.stopMotion = function() {
	if(this._limit()) { return; }
	this.keep_moving = false;
	this.moving = false;
	this.driver.quit();
}

LiveCodeRuntime.prototype.fixedMove = function(axis, speed, distance) {
	if(this.moving) {
		log.warn("fixedMove: Already moving");
	} else {
		var axis = axis.toUpperCase();
		if('XYZABCUVW'.indexOf(axis) >= 0) {
			if(speed) {
				var move = 'G91\nG1 ' + axis + distance.toFixed(5) + ' F' + speed.toFixed(3) + '\n';
			} else {
				var move = 'G91\nG0 ' + axis + distance.toFixed(5) + '\n';				
			}
			this.driver.gcodeWrite(move);
log.debug("livecodeFIXEDMOVE >> " + axis);
		}
	}
}

LiveCodeRuntime.prototype.pause = function() {
	this.driver.feedHold();
}

LiveCodeRuntime.prototype.quit = function() {
	this.driver.quit();
}

LiveCodeRuntime.prototype.resume = function() {
	this.driver.resume();
}


exports.LiveCodeRuntime = LiveCodeRuntime;
