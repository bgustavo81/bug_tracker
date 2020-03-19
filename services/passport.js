const passport = require('passport');
const bcrypt = require('bcrypt');

// const JwtStrategy = require('passport-jwt').Strategy;
// const { ExtractJwt } = require('passport-jwt');

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;

const keys = require('../config/keys');
const User = require('../models/users');

    
const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
}
 

// passport.use(new JwtStrategy({
//   jwtFromRequest: cookieExtractor,
//   secretOrKey: keys.cookieKey,
//   passReqToCallback: true
// }, async (req, payload, done) => {
//   try {
//     console.log('line 32');
//     console.log(req);
//     console.log('line 34');
//     console.log(payload);
//   } catch {
//     console.log('error')
//   }
// }));



passport.use(new LocalStrategy({
     usernameField: 'email',
     passwordField: 'password'
   }, async(email, password, done) => {
     let user = await User.getUserByEmail(email);
     if (user === null) {
       return done(null, false, { message: "No user with email"});
     }
     user = user.rows[0];
     try {
       if (await bcrypt.compare(password, user.password)) {
         user = user.user_id;
         return done(null, user);
       } else {
         return done(null, false, {message: 'Password incorrect'})
       }
     } catch (err) {
       return done(err)
     }
   })
 );

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






