let express = require('express');
let passport = require('passport');

class Auth{
    constructor(){
        this.strategy;
        this.passportName;
        this.router = express.Router();
    };

    applyData(data, passport){
        passport.use(new this.strategy({
            clientID: data.clientID,
            clientSecret: data.clientSecret,
            callbackURL: data.callbackURL
        }, data.authMeth || function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }))

        this.router.get(data.route, passport.authenticate(this.passportName));
        this.router.get(data.callback,
            passport.authenticate(this.passportName, { failureRedirect: data.failureRedirect || '/' }),
            data.successRoute || function(req, res) {
                res.redirect('/');
            });
    }

    getRouter(){
        return this.router;
    };
}
class Twitter extends Auth{
    constructor(){
        super();
        this.strategy = require('passport-twitter').Strategy;
        this.passportName = "twitter";
    }
    applyData(data, passport){
        passport.use(new this.strategy({
            consumerKey: data.clientID,
            consumerSecret: data.clientSecret,
            callbackURL: data.callbackURL
        }, data.authMeth || function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }));

        this.router.get(data.route, passport.authenticate(this.passportName));
        this.router.get(data.callback,
            passport.authenticate(this.passportName, { failureRedirect: data.failureRedirect || '/' }),
            data.successRoute || function(req, res) {
                res.redirect('/');
            });
    }

}
class Facebook extends Auth{
    constructor(){
        super();
        this.strategy = require('passport-facebook').Strategy;
        this.passportName = "facebook";

    };
}

class Google extends Auth{
    constructor(){
        super();
        this.strategy = require('passport-google-oauth').OAuth2Strategy;
        this.passportName = "google";

    };
}

class Github extends Auth{
    constructor(){
        super();
        this.strategy = require('passport-github').Strategy;
        this.passportName = "github";

    };
}

class Linkedin extends Auth{
    constructor(){
        super();
        this.strategy = require('passport-linkedin').Strategy;
        this.passportName = "linkedin";

    }
    applyData(data, passport){
        passport.use(new this.strategy({
            consumerKey: data.clientID,
            consumerSecret: data.clientSecret,
            callbackURL: data.callbackURL
        }, data.authMeth || function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }));

        this.router.get(data.route, passport.authenticate(this.passportName));
        this.router.get(data.callback,
            passport.authenticate(this.passportName, { failureRedirect: data.failureRedirect || '/' }),
            data.successRoute || function(req, res) {
                res.redirect('/');
            });
    }
}

class Local extends Auth{
    constructor(){
        super();
        this.strategy = require('passport-local').Strategy;
    }

    applyData(data, passport){
        data
        passport.use(data.type, new this.strategy({
            usernameField: data.usernameField,
            passwordField: data.passwordField,
            passReqToCallback: data.passReqToCallback || false
        }, data.authMeth || function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }));

        if(data.type === 'localSignup'){
            this.router.post('/signup', passport.authenticate(data.type));
        }else{
            this.router.post('/login', passport.authenticate(data.type, {
                successRedirect: (data.successRedirect? data.successRedirect: undefined),
                failureRedirect: (data.failureRedirect? data.failureRedirect: undefined)
            }));
        }
    }
}

class AuthManager{
    constructor(settings){
        this.router = express.Router();
        this.passport = passport;
        this.settings = settings;

        this.router.use(this.passport.initialize());
        this.router.use(this.passport.session());
        this._generatePassport();

        this.passport.serializeUser(function(user, done) {
            done(null, user);
        });

        this.passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    };

    _generatePassport(){
        let _arrSettings = Object.keys(this.settings);
        _arrSettings.map(element => {
            element
            let settingsData = this.settings[element];
        if(element === 'localSignup' || element === 'localLogin') settingsData.type = element;
        let authMet = this._createAuth(element, settingsData);
        this.router.use(authMet.getRouter())
    });
    }

    _createAuth(type,data){
        let auth = {
            twitter : Twitter,
            facebook: Facebook,
            google: Google,
            github: Github,
            linkedin: Linkedin,
            localSignup: Local,
            localLogin: Local
        };

        let authMet = new auth[type]();
        authMet.applyData(data, this.passport);
        return authMet;
    };

    getRouter(){
        this.router.get(this.passport)
        return this.router;
    };
};

module.exports = (settings) => new AuthManager(settings).getRouter();