const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../models/user');

passport.use(
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