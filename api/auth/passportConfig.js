require("dotenv").config();
// const db = require("./query");
const db = require("../../data/dbConfig");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const generateToken = require("./token-gen");

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((id, done) => {
  db("users")
    .where({ userId: id })
    .first()
    .then(user => {
      if (!user) {
        done(new Error("User not found " + id));
      }
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      // Google+ API Keys
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      // callback
      const existingUser = await db("users")
        .where({
          email: profile.emails[0].value
        })
        .first();
      if (existingUser) {
        let accessToken = generateToken.generateToken(existingUser.email);
        existingUser.token = accessToken;
        done(null, existingUser);
      } else {
        let accessToken = generateToken.generateToken(profile.emails[0].value);
        await db("users").insert({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          token: accessToken
        });
        const user = await db("users")
          .where({ email: profile.emails[0].value })
          .first();

        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL || "/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"]
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await db("users")
        .where({ email: profile.emails[0].value })
        .first();

      if (existingUser) {
        let accessToken = generateToken.generateToken(existingUser.email);
        existingUser.token = accessToken;
        done(null, existingUser);
      } else {
        let accessToken = generateToken.generateToken(profile.emails[0].value);
        await db("users").insert({
          facebookId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          token: accessToken
        });
        const user = await db("users")
          .where({ email: profile.emails[0].value })
          .first();

        done(null, user);
      }
    }
  )
);
