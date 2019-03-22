require("dotenv").config();
const db = require("./query");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      // Google+ API Keys
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      // callback
      db.findUserByGoogleId(profile.id).then(id => {
        console.log("profile", profile);
        if (id) {
          return done(null, profile);
        } else {
          db.getUsers()
            .insert(
              {
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                picture: profile.photos[0].value
              },
              "*"
            )
            .then(users => {
              return done(null, users[0]);
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
