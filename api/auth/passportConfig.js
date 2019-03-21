require("dotenv").config();
const db = require('./query');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  // Google+ API Keys
  callbackURL: '/auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // callback
    db.findUserByGoogleId(profile.id).then((id) => {
      // console.log('profile', profile)
      if (id) {
        return done(null, profile);
      } else {
        db.createUserWithGoogleId(profile.id).then((id) => {
          return done(null, profile);
        });
      }
    })
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});