# passport-universal-auth

#usage
```javascript 1.8
let authSettings = {
    twitter: {
        clientID: "jFh",
        clientSecret: "kz",
        callbackURL: "http://localhost:30001/auth/twitter/callback",
        authMeth: function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        },
        route: "/auth/twitter",
        callback: "/auth/twitter/callback",
        failureRedirect: "/",
        successRoute: function(req, res) {
            res.redirect('/');
        }
    },
    linkedin: {
        clientID: "86",
        clientSecret: "fE",
        callbackURL: "http://localhost:30001/auth/linkedin/callback",
        authMeth: function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        },
        route: "/auth/linkedin",
        callback: "/auth/linkedin/callback",
        failureRedirect: "/",
        successRoute: function(req, res) {
            res.redirect('/');
        }
    },
    localSignup:{
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
        authMeth: function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    },
    localLogin:{
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
        authMeth: function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        },
        successRedirect: "/"
    }
}
```