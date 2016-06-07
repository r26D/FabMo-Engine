async = require('async');
util = require('util');
Config = require('./config').Config;

var log = require('../log').logger('marlinconfig');

// A DriverConfig is the configuration object that stores the configuration values for Marlin.
// Marlin configuration data is *already* JSON formatted, so DriverConfig objects are easy to create from config files using `load()`
// A DriverConfig object is bound to a driver, which gets updated when configuration values are loaded/changed.
DriverConfig = function(driver) {
	Config.call(this, 'marlin');
};
util.inherits(DriverConfig, Config);

DriverConfig.prototype.init = function(driver, callback) {
	this.driver = driver;
	Config.prototype.init.call(this, callback);
}

DriverConfig.prototype.changeUnits = function(units, callback) {
// TODO
	// this.driver.setUnits(units, function(err, data) {
	// 	if(err) {
	// 		callback(err);
	// 	} else {
	// 		this.getFromDriver(function(err, marlin_values) {
	// 			if(err) {
	// 				callback(err);
	// 			} else  {
	// 				this.setMany(marlin_values, callback);
	// 			}
	// 		}.bind(this));
	// 	}
	// }.bind(this));
	callback(null,null);
}

DriverConfig.prototype.getFromDriver = function(callback) {
	var keys = Object.keys(this._cache)
	this.driver.get(Object.keys(this._cache), function(err, values) {
		if(err) {
			callback(err);
		} else {
			if(keys.length != values.length) {
				callback(new Error("Something went wrong when getting values from Marlin"))
			} else {
				var obj = {}
				for(var i=0; i<keys.length; i++) {
					obj[keys[i]] = values[i];
				}
				callback(null, obj);
			}
		}

	});
}

// Update the configuration with the data provided (data is just an object with configuration keys/values)
DriverConfig.prototype.update = function(data, callback) {
	keys = Object.keys(data);
	// TODO: We can probably replace this with a `setMany()`
	async.mapSeries(
		keys,
		// Call driver.set() for each item in the collection of data that was passed in.
		function iterator(key, cb) {
			if(this.driver) {
				this.driver.set(key, data[key], cb);
			} else {
				cb(null);
			}
		}.bind(this),
		// Update the cache with all the values returned from the hardware
		function done(err, results) {
			if(err) { return callback(err); }
			var retval = {};
			for(var i=0; i<keys.length; i++) {
				key = keys[i];
				value = results[i];
				this._cache[key] = value;
				retval[key] = value;
			}

			this.save(function(err, result) {
				if(err) {
					callback(err);
				} else {
					callback(null, retval);
				}
			}.bind(this));
		}.bind(this)
	);
};

DriverConfig.prototype.restore = function(callback) {
	this.update(this._cache, callback);
}

// Status reports are special, and their format must be whats expected for the machine/runtime environments
// to work properly.
// TODO: Move this data out into a configuration file, perhaps.
DriverConfig.prototype.configureStatusReports = function(callback) {
	if(this.driver) {
	// this.driver.command({"sr":{
	// 					"posx":true,
	// 					"posy":true,
	// 					"posz":true,
	// 					"posa":true,
	// 					"posb":true,
	// 					"vel":true,
	// 					"stat":true,
	// 					"hold":true,
	// 					"line":true,
	// 					"coor":true,
	// 					"unit":true,
	// 					"in1":true,
	// 					"in2":true,
	// 					"in3":true,
	// 					"in4":true,
	// 					"in5":true,
	// 					"in6":true,
	// 					"in7":true,
	// 					"in8":true
	// 				}});
	// 	this.driver.command({"qv":0});
	// 	this.driver.command({"jv":4});
		driver = this.driver;
		setInterval(function () {
			driver.requestStatusReport();
		},500);
		return callback(null, this);
	} else {
		return callback(null, this);
	}
};
exports.DriverConfig = DriverConfig;
