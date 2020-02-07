const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');
const User = require('../models/user');

passport.use(
    // new LocalStrategy(
    //     function(username, password, done) {
    //       User.findOne({ username: username }, function (err, user) {
    //         if (err) { return done(err); }
    //         if (!user) { return done(null, false); }
    //         if (!user.verifyPassword(password)) { return done(null, false); }
    //         return done(null, user);
    //       });
    //     }
    // )
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        const userId = profile.id;
        const firstName = profile.name.familyName;
        const lastName = profile.name.givenName;
        const email = profile.emails[0].value;
        
        const user = await User.getUser(userId)
            if (user.rowCount === 1) {
                console.log(user);
                console.log("line 20 we have a user: " + user.rows[0].user_id);
                // we have a record of a user
                done(null, user.rows[0].user_id);
            } else {
                console.log("createUser");
                // we have to record a new user
                let user = await new User(userId, firstName, lastName, email);
                user = user.createUser();
                console.log(userId);
                done(null, userId);
            }
        })
    );

    // passport.use(new FacebookStrategy({
    //     clientID: FACEBOOK_APP_ID,
    //     clientSecret: FACEBOOK_APP_SECRET,
    //     callbackURL: "auth/facebook/callback",
    //     proxy: true
    //   }, async (accessToken, refreshToken, profile, done) => {
    //     // find a way to query the profile to DB
    //     User.findOrCreate(..., function(err, user) {
    //       if (err) { return done(err); }
    //       done(null, user);
    //     });
    //   }
    // ));

    // passport.use(
    //     new TwitterStrategy({
    //     consumerKey: keys.twitterApiKey,
    //     consumerSecret: keys.twitterApiKey,
    //     callbackURL: "auth/twitter/callback",
    //     proxy: true
    //   }, async (token, tokenSecret, profile, done) => {
    //     profile = profile;
    //     // get other relevant information
        
    //     // find a way to query the info into the DB

    //     User.findOrCreate(..., function(err, user) {
    //         if (err) { return done(err); }
    //         done(null, user);
    //       });

    //   }
    // ));
    
    
    passport.serializeUser(async (user, done) => {
        console.log("line 38: " + user);
        done(null, user);
    });
    
    passport.deserializeUser( async (id, done) => {
        console.log("line 43: " + id);
        await User.getUser(id).then(user => {
            done(null, user);
        });
    });