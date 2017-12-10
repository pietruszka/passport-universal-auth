# passport-universal-auth

#usage
```javascript 1.8
let authSettings = {
    twitter: {
        clientID: "jFhauZyehl1e0N3qhhuJ5XasN",
        clientSecret: "kzcUo0L7lWMqR71r8wwZFgD1LJExkGMtfRhO3WXmpRXphVcGZR",
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
        clientID: "86wkiaes1uktus",
        clientSecret: "fEQFKpvni8LtzgHk",
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