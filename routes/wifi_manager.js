
var log = require('../log').logger('wifi');
var config =  require('../config');
var network = require('../network');

scan = function(req, res, next) {
    network.getAvailableWifiNetworks(function(err, data) {
        if (err) {
            log.error(err);
            res.json({'status':'error', 'message':err});
        } else {
            res.json({'status':'success','data':{'wifi':data}});
        }
    });
};

connect = function(req, res, next) {
    ssid = req.params.ssid
    key = req.params.key
    if(ssid) {
        network.createProfileForAvailableWirelessNetwork(ssid, key, function(err, data) {
            if(err) {
                res.json({'status':'error', 'message' : err});
            } else {
                res.json({'status':'success'})
            }
        });
    } else {
        res.json({'status':'error', 'message':'No SSID provided'});
    }
}

listProfiles = function(req, res, next) {
    network.getWifiProfiles(function(err, profiles) {
        if(err) {
            res.json({'status':'error', 'message':err});
        } else {
            res.json({'status':'success', 'data' : profiles});
        }
    });
};

deleteProfile = function(req, res, next) {
    if(req.params.ssid)
    {
        network.removeWifiProfile(ssid, function(err) {
            if(err) {
                res.json({'status':'error', 'message':err});
            } else {
                res.json({'status':'success'});
            }
        });
    }
    else{
        res.json({'error':'No SSID provided'});
    }
};

getProfile = function(req, res, next) {
    if(req.params.ssid)
    {
        network.getWifiProfile(req.params.ssid, function(err, profile) {
            if(err) {
                res.json({'status':'error', 'message':err});
            } else {
                res.json({'status':'success', 'data' : profile});
            }
        });
    }
    else{
        res.json({'error':'No SSID provided'});
    }
}


module.exports = function(server) {
    if(config.engine.get('wifi_manager')){
        server.get('/network/wifi/scan',scan); //OK
        server.post('/network/wifi/connect', connect) // OK
        server.get('/network/wifi/profiles',listProfiles); //OK
        //server.post('/network/wifi/profile',add_profile); //TODO: ADD THIS BACK IN
        server.del('/network/wifi/profile/:ssid',deleteProfile); //OK
        server.get('/network/wifi/profile/:ssid',getProfile); //OK
    }
    else{
        log.warn('WiFi manager disabled');
    }
};
