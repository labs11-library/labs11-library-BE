require("dotenv").config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  // Google+ API Keys
  callbackURL: '/auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    // callback
    console.log('profile', profile)
  })
)