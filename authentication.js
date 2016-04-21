var passport = require('passport-restify');
var LocalStrategy   = require('passport-local').Strategy;
var User = require('./db').User;
var machine = require('./machine');
var util = require('util');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var currentUser = null; // keep track of the current registered user
var userTimer = 5*60*1000; // 5 minutes
var currentUserTimer = null;
var isCurrentUserKickeable = false;
var userToKickout = undefined;

function startUserTimer(){
  var currentUserTimer = setTimeout(userTimeout,userTimer);
}

function resetUserTimer(){
  clearTimeout(currentUserTimer);
  currentUserTimer = startUserTimer();
}
function userTimeout(){
  isCurrentUserKickeable = true;
}


function logOutUser(user){
  var property = 'user';
if (this._passport && this._passport.instance) {
  property = this._passport.instance._userProperty || 'user';
}

this[property] = null;
if (this._passport && this._passport.session) {
  delete this._passport.session.user;
}
}


exports.configure = function(){
  passport.use(new LocalStrategy({passReqToCallback: true},
    function(req, username, password, done) {
      User.findOne(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        // success ! the usert that did the request is registered in the database.

        // check if the user can take the control of the tool.

        if(userToKickout && userToKickout.username === username){ // the freshly kicked out user is doing a request.
          //no boy. you can't do that anymore.
          req.logout(); // remove his session information.
          userToKickout=undefined;
          //console.log("current user have been kicked out");
          return done(null, false, { message: 'you have been kicked by user '+currentUser.username+'.'});
        }

        if(currentUser && currentUser.username !== username){ // a user is already connected
          if(req.params.kickout!==true){ // there is no request to kick the current user out.
            //console.log("there is already a user using the tool");
            return done(null, false, { message: 'The user '+currentUser.username+' is already controlling the tool', userAlreadyLogedIn:true});
          }

          /****************************** Check the kickoutability of the user already connected ****************/
          if(!user.isAdmin){ // the user that wants to connect is not admin
            if(currentUser.isAdmin){ //you can't kick out an admin if your a simple user
              //console.log("current user is admin");
              return done(null, false, { message: 'The user '+currentUser.username+' is an admin.'});
            }
            if(!isCurrentUserKickeable){ //you can't kick out a user that is actively using the tool.
              //console.log("current user is active");
              return done(null, false, { message: 'The user '+currentUser.username+' is still active.'});
            }
            if(machine.machine.status.state === 'running') { //you can't kick a user that is running a file.
                //console.log("current user is running a file");
                return done(null, false, { message: 'The user '+currentUser.username+' is running a file.'});
            }
          }
          userToKickout = currentUser;
          eventEmitter.emit("user_kickout",currentUser);
          currentUser = user;
          isCurrentUserKickeable = false;
          startUserTimer();
          return done(null, user);
          /******************************************************************************************************/
        }

        if(!currentUser){ // first authentication
        //We can login the user !
        currentUser = user;
        isCurrentUserKickeable = false;
        startUserTimer();
        }
        return done(null, user);
      });
    }
  ));
};

var signup = function(username,password,callback){
  User.add(username,password,callback);
};

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.eventEmitter = eventEmitter;

exports.signup = signup;

exports.passport = passport;

exports.getUserById = function(id,cb){
  User.findById(id, function(err, user) {
    cb(err, user);
  });
}

exports.getCurrentUser = function(u){return currentUser;}
exports.setCurrentUser = function(u){currentUser = u;}
exports.setUserAsActive = function(){resetUserTimer();}