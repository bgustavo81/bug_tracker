const passport = require('passport');
const bcrypt = require('bcrypt');

const GoogleStrategy = require('passport-google-oauth').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

const keys = require('../config/keys');
const User = require('../models/users');

  
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
      console.log(profile);
      
      const user = await User.getUser(userId)
          if (user.rowCount === 1) {
              // we have a record of a user
              done(null, user.rows[0].user_id);
          } else {
              // we have to record a new user
              let user = await new User(userId, firstName, lastName, email);
              user = user.createUser();
              done(null, userId);
          }
      })
  );

  
  passport.use(new FacebookStrategy({
    clientID: keys.facebookApiKey,
    clientSecret: keys.facebookApiSecretKey,
    callbackURL: "/auth/facebook/callback",
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    const userId = profile.id;
    let displayName = profile.displayName.split(" ");
    const firstName = displayName[0];
    const lastName = displayName[1];
    console.log(profile);

    const user = await User.getUser(userId);
      if (user.rowCount === 1) {
        done(null, user.rows[0].user_id)
      } else {
        let user = await new User(userId, firstName, lastName, null);
        user = user.createUser();
        done(null, userId);
      }
  }
));




    passport.use(new GithubStrategy({
      clientID: keys.githubApiKey,
      clientSecret: keys.githubSecretApiKey,
      callbackURL: "/auth/github/callback",
      proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
      const userId = profile.id;
      const firstName = profile.username;
      console.log(profile);
      
      const user = User.getUser(userId);
      if (user.rowCount === 1) {
        done(null, user.rows[0].user_id)
      } else {
        let user = await new User(userId, firstName, null, null)
        user = user.createUser();
        done(null, userId);
      }
    }
  ));

passport.serializeUser( async (user, done) => {
    done(null, user);
});

passport.deserializeUser( async (id, done) => {
    await User.getUser(id).then(user => {
        done(null, user);
    });
});






