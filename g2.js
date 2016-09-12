var serialport = require("serialport");
var fs = require("fs");
var events = require('events');
var async = require('async');
var util = require('util');
var Queue = require('./util').Queue;
var Watchdog = require('./util').Watchdog;
var log = require('./log').logger('g2');
var process = require('process');
var jsesc = require('jsesc');
var TinyG = require('tinyg');
var stream = require('stream');

var TG_CONCURRENT_LIMIT = 5;
// Values of the **stat** field that is returned from G2 status reports
var STAT_INIT = 0;
var STAT_READY = 1;
var STAT_ALARM = 2;
var STAT_STOP = 3;
var STAT_END = 4;
var STAT_RUNNING = 5;
var STAT_HOLDING = 6;
var STAT_PROBE = 7;
var STAT_CYCLING = 8;
var STAT_HOMING = 9;
var STAT_INTERLOCK = 11;
var STAT_SHUTDOWN = 12;
var STAT_PANIC = 13;

// Should take no longer than CMD_TIMEOUT to do a get or a set operation
var CMD_TIMEOUT = 10000;
var EXPECT_TIMEOUT = 300000;

// When jogging, "keepalive" jog commands must arrive faster than this interval (ms)
// This can be slowed down if necessary for spotty connections, but a slow timeout means
// the machine has more time to run away before stopping.
var JOG_TIMEOUT = 500;

var GCODE_BLOCK_SEND_SIZE = 4;
var GCODE_MIN_LINE_THRESH = 250;

// Map used by the jog command to turn incoming direction specifiers to g-code
var JOG_AXES = {'x':'X',
				'-x':'X-',
				'y':'Y',
				'-y':'Y-',
				'z':'Z',
				'-z':'Z-',
				'a':'A',
				'-a':'A-',
				'b':'B',
				'-b':'B-',
				'c':'C',
				'-c':'C-'};

var RESPONSE_LIMIT = 4;
// Error codes defined by G2
// See https://github.com/synthetos/g2/blob/edge/TinyG2/tinyg2.h for the latest error codes and messages
try {
	var G2_ERRORS = JSON.parse(fs.readFileSync('./data/g2_errors.json','utf8'));
} catch(e) {
	var G2_ERRORS = {};
}

// G2 Constructor
function G2() {
	this.current_data = [];
	this.current_gcode_data = [];
	this.g2_status = {'stat':null, 'posx':0, 'posy':0, 'posz':0};
	this.status = {'stat':'idle', 'posx':0, 'posy':0, 'posz':0};

	this.gcode_queue = new Queue();
	this.write_queue = new Queue();

	//this.watchdog = new Watchdog(10000,14); //time, exit code
	this.pause_flag = false;
	this.connected = false;

	// Jogging state
	this.jog_stop_pending = false;
	this.jog_direction = null;
	this.jog_command = null;
	this.jog_heartbeat = null;

	// Feedhold/flush
	this.quit_pending = false;
	this.stat = null;
	this.hold = null;

	// Readers and callbacks
	this.expectations = [];
	this.readers = {};

	// Members related to streaming
	this.qtotal = 0;
	this.flooded = false;
	this.send_rate = 1;
	this.lines_sent = 0;

	this.response_count = 1;

	// Event emitter inheritance and behavior setup
	events.EventEmitter.call(this);
	this.setMaxListeners(50);
}
util.inherits(G2, events.EventEmitter);

// Actually open the serial port and configure G2 based on stored settings
G2.prototype.connect = function(control_path, gcode_path, callback) {

	// Store paths for safe keeping
	this.control_path = control_path;
	this.gcode_path = gcode_path;

	var tg = new TinyG();
	this.tg = tg;

	// Called once BOTH ports have been opened
	this.connect_callback = callback;
	log.debug('Connecting...');
	tg.on('open', function() {
		var startTime = new Date().getTime();
		log.debug('On Open...')

		tg.on('error', this.onSerialError.bind(this));
		tg.on('close', this.onSerialClose.bind(this));
		tg.on('errorReport', this.handleExceptionReport.bind(this));

		tg.on('statusChanged', this.onStatusChanged.bind(this));
		tg.on('setupDone', function() {this.emit('ready', this);}.bind(this));
		tg.on('sentRaw', function(s) { 
			t = new Date().getTime();
			log.g2('---G2--' + (t-startTime) + '----> ' + jsesc(s.trim()));
		});

		tg.on('data', function(s) { 
			t = new Date().getTime();
			log.g2('<--G2--' + (t-startTime) + '----- ' + jsesc(s.trim()));
		});

		// Kill anything already going on and clear queue
		tg.write("\x04")
		tg.write({'clr':null});

		// Request a status report
		this.requestStatusReport();
		this.connected = true;
		log.debug("Connect callback")
		callback(null, this);
	}.bind(this));

	tg.open(control_path, {'dataPortPath' : gcode_path});
};

G2.prototype.disconnect = function(callback) {
	this.tg.close();
	callback();
};

// Log serial errors.  Most of these are exit-able offenses, though.
G2.prototype.onSerialError = function(data) {
	//if(this.connect_callback) {
	//	this.connect_callback(data);
	//}
};

G2.prototype.onSerialClose = function(data) {
	this.connected= false;
	log.error('G2 Core serial link was lost.')
	process.exit(14);
};

G2.prototype.clearAlarm = function() {
	//this.watchdog.start();
	this.write({"clear":null});
};

G2.prototype.setUnits = function(units, callback) {
	if(units === 0 || units == 'in') {
		log.info('Setting driver units to INCH');
		gc = 'G20';
		units = 0;
	} else if(units === 1 || units === 'mm') {
		log.info('Setting driver units to MM');
		gc = 'G21';
		units = 1;
	} else {
		return callback(new Error('Invalid unit setting: ' + units));
	}
	this.set('gun', units, function() {
		this.runString(gc, function(err, data) {
			this.requestStatusReport(callback);
		}.bind(this));
	}.bind(this));
}

G2.prototype.requestStatusReport = function(callback) {
	// Register the callback to be called when the next status report comes in
	if(typeof callback === 'function') {
		this.tg.once('statusChanged', function() {
			callback();
		});
	}
	this.write({'sr':null});
};

G2.prototype.handleFooter = function(response) {
	if(response.f) {
		if(response.f[1] !== 0) {
			var err_code = response.f[1];
			var err_msg = G2_ERRORS[err_code] || ['ERR_UNKNOWN', 'Unknown Error'];
			// TODO we'll have to go back and clean up alarms later
			// For now, let's not emit a bunch of errors into the log that don't mean anything to us
			this.emit('error', [err_code, err_msg[0], err_msg[1]]);
			return new Error(err_msg[1]);
		}
	}
};

G2.prototype.handleExceptionReport = function(er) {
	if(er) {
		this._lastExceptionReport = er;
		var stat = er.st;
		if(((stat === 204) || (stat === 207)) && this.quit_pending) {
			this.write("{clr:n}");
			this.write("M30");
			this.quit_pending = false;
		}
	}
};

G2.prototype.getLastException = function() {
	return this._lastExceptionReport || null;
}

G2.prototype.clearLastException = function() {
	this._lastExceptionReport = null;
}

/*
0	machine is initializing
1	machine is ready for use
2	machine is in alarm state (shut down)
3	program stop or no more blocks (M0, M1, M60)
4	program end via M2, M30
5	motion is running
6	motion is holding
7	probe cycle active
8	machine is running (cycling)
9	machine is homing
*/
G2.prototype.handleStatusReport = function(sr) {

	// Update our copy of the system status
	for (var key in sr) {
		value = sr[key];
		if(key === 'unit') {
			value = value === 0 ? 'in' : 'mm';
		}
		this.status[key] = value;
	}

	if('stat' in sr) {
		if(sr.stat === STAT_STOP) {
			if(this.flushcallback) {
				this.flushcallback(null);
				this.flushcallback = null;
			}
		}
	}

	this.stat = this.status.stat !== undefined ? this.status.stat : this.stat;
	this.hold = this.status.hold !== undefined ? this.status.hold : this.hold;

	// Emit status no matter what
	this.emit('status', this.status);
};

G2.prototype.onStatusChanged = function(status) {
	this.handleStatusReport(status);
}

// Called once a proper JSON response is decoded from the chunks of data that come back from G2
G2.prototype.onMessage = function(response) {
	// Special message type for initial system ready message
	if(r.msg && (r.msg === "SYSTEM READY")) {
		this.emit('ready', this);
	}
};

G2.prototype.feedHold = function(callback) {
	this.pause_flag = true;
	this.flooded = false;
	typeof callback === 'function' && this.once('state', callback);
	log.debug("Sending a feedhold");
	this.write('!');
};

G2.prototype.queueFlush = function(callback) {
	log.debug('Clearing the queue.');
	this.flushcallback = callback;
	this.write('{clr:n}');
	this.write('\%');
};

G2.prototype.resume = function() {
	this.write('~'); //cycle start command character
	this.pause_flag = false;
};

G2.prototype.quit = function() {
	this.quit_pending = true;
	this.write('\x04');
}

G2.prototype.get = function(key, callback) {
	if(key instanceof Array) {
		keys = key;
		is_array = true;
	} else {
		is_array = false;
		keys = [key];
	}


	async.mapLimit(keys,
		TG_CONCURRENT_LIMIT, 
		// Function called for each item in the keys array
		function(k, cb) {
			this.tg.get(k).then(function(value) {
				cb(null, value);
			}).catch(cb);
		}.bind(this),

		// Function to call with the list of results
		function(err, result) {
			if(err) {
				return callback(err, result);
			} else {
				// If given an array, return one.  Else, return a single item.
				if(is_array) {
					return callback(err, result);
				} else {
					return callback(err, result[0]);
				}
			}
		}
	);
};

G2.prototype.setMany = function(obj, callback) {
	var keys = Object.keys(obj);
	async.mapLimit(keys,
		TG_CONCURRENT_LIMIT,
		// Function called for each item in the keys array
		function(k, cb) {
			this.tg.set(k, obj[k]).then(function(value) {
				cb(null, value);
			}).catch(function(err) {
				cb(err)
			});
		}.bind(this),

		// Function to call with the list of results
		function(err, result) {
			if(err) {
				return callback(err, result);
			} else {
				var retval = {};
				try {
					for(i=0; i<keys.length; i++) {
						retval[keys[i]] = result[i];
					}
				} catch(e) {
					callback(e, null);
				}

				return callback(null, retval);
			}
		}
	);
};

G2.prototype.set = function(key, value, callback) {
	var packet = {}
	packet[key] = value
	var callback = callback || function noop() {};
	this.tg.set(packet).then(function(value) {
		callback(null, value);
	}).catch(function(err) {
		callback(err);
	});
};

// Send a command to G2 (can be string or JSON)
G2.prototype.write = function(obj) {
	var cmd;
	if((typeof obj) == 'string') {
		cmd = obj.trim();
	} else {
		cmd = JSON.stringify(obj);
		cmd = cmd.replace(/(:\s*)(true)(\s*[},])/g, "$1t$3")
		cmd = cmd.replace(/(:\s*)(false)(\s*[},])/g, "$1f$3")
		cmd = cmd.replace(/"/g, '');
		this.tg.write(cmd);
	}
		this.tg.write(cmd);
};

// Send a (possibly multi-line) string
// An M30 will be placed at the end to put the machine back in the "idle" state
G2.prototype.runString = function(data, callback) {
	this.runSegment(data + "\nM30\n", callback);
};

G2.prototype.runImmediate = function(data, callback) {
	this.expectStateChange( {
		'end':callback,
		'stop':callback,
		'timeout':function() {
			callback(new Error("Timeout while running immediate gcode"));
		}
	});
	this.runString(data);
}

// Send a (possibly multi-line) string
G2.prototype.runSegment = function(data, callback) {
	line_count = 0;

	var s = new stream.Readable();
	s._read = function noop() {}; // redundant? see update below
	s.close = function noop() {};
	s.push(data);
	s.push(null);

	lines = data.split('\n');

	this.tg.sendFile(s, function() {});
	typeof callback === 'function' && callback(null);
};

G2.prototype.runGCodes = function(codes, callback) {
	this.runSegment(codes.join('\n') + '\n', function() {});
	typeof callback === 'function' && callback(null);
}

G2.prototype.setMachinePosition = function(position, callback) {
	var gcode = ["G21"];
	['x','y','z','a','b','c','u','v','w'].forEach(function(axis) {
		if(position[axis] != undefined) {
			gcode.push('G28.3 ' + axis + position[axis].toFixed(5));
		}
	});
	if(this.status.unit === 'in') {
		gcode.push('G20');
	}
	this.runGCodes(gcode, callback);
}

// Function works like "once()" for a state change
// callbacks is an associative array mapping states to callbacks
// If the *next* state change matches a state in the associative array, the callback it maps to is called.
// If null is specified in the array, this callback is used for any state that is unspecified
//
// eg:
// this.expectStateChange {
//                          STAT_END : end_callback,
//                          STAT_PAUSE : pause_callback,
//                          null : other_callback};
//
// In the above example, when the next change of state happens, the appropriate callback is called in the case
// that the new state is either STAT_END or STAT_PAUSE.  If the new state is neither, other_callback is called.

G2.prototype.expectStateChange = function(callbacks) {
	if("timeout" in callbacks) {
		var fn = callbacks.timeout;
		setTimeout(function() {
			if(this.expectations.length > 0) {
				callbacks = this.expectations[this.expectations.length-1];
				if(callbacks.timeout === fn) {
					log.debug("Calling timeout function");
					this.expectations.pop();
					fn(this);
				}
			}
		}.bind(this), EXPECT_TIMEOUT);
	}
	this.expectations.push(callbacks);
};

states = {
	0 : "init",
	1 : "ready",
	2 : "alarm",
	3 : "stop",
	4 : "end" ,
	5 : "running",
	6 : "holding",
	7 : "probe",
	8 : "cycling",
	9 : "homing",
	11 : "interlock",
	12 : "shutdown",
	13 : "panic"
};

var state = function(s) {
	return states[s];
};

// export the class
exports.G2 = G2;

exports.STAT_INIT = STAT_INIT;
exports.STAT_READY = STAT_READY;
exports.STAT_ALARM = STAT_ALARM;
exports.STAT_STOP = STAT_STOP;
exports.STAT_END = STAT_END;
exports.STAT_RUNNING = STAT_RUNNING;
exports.STAT_HOLDING = STAT_HOLDING;
exports.STAT_PROBE = STAT_PROBE;
exports.STAT_CYCLING = STAT_CYCLING;
exports.STAT_HOMING = STAT_HOMING;
exports.STAT_INTERLOCK = STAT_INTERLOCK;
exports.STAT_SHUTDOWN = STAT_SHUTDOWN;
exports.STAT_PANIC = STAT_PANIC;

G2.prototype.STAT_INIT = STAT_INIT;
G2.prototype.STAT_READY = STAT_READY;
G2.prototype.STAT_ALARM = STAT_ALARM;
G2.prototype.STAT_STOP = STAT_STOP;
G2.prototype.STAT_END = STAT_END;
G2.prototype.STAT_RUNNING = STAT_RUNNING;
G2.prototype.STAT_HOLDING = STAT_HOLDING;
G2.prototype.STAT_PROBE = STAT_PROBE;
G2.prototype.STAT_CYCLING = STAT_CYCLING;
G2.prototype.STAT_HOMING = STAT_HOMING;
G2.prototype.STAT_INTERLOCK = STAT_INTERLOCK;
G2.prototype.STAT_SHUTDOWN = STAT_SHUTDOWN;
G2.prototype.STAT_PANIC = STAT_PANIC;
