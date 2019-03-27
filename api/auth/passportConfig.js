require("dotenv").config();
const db = require("./query");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// const token = require("./token-gen");

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
        // console.log("profile", profile);
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
              console.log("users", users)
              return done(null, users[0]);
            });
        }
      });
    }
  )
);

// line 25
// console.log("id", id)
  // const payload = {
  //   subject: id.userId
  // };

  // jwt.sign(
  //   payload,
  //   secret,
  //   { expiresIn: "1d" },
  //   (err, token) => {
  //     res.json({
  //       success: true,
  //       token
  //     });
  //   }
  // );
// let token = token.generateToken(id);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL:
        process.env.FB_CALLBACK_URL ||
        "http://localhost:9001/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"]
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      db.findUserByFacebookId(profile.id).then(id => {
        console.log("profile", profile);
        if (id) {
          return done(null, profile);
        } else {
          db.getUsers()
            .insert(
              {
                facebookId: profile.id,
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

// Line 40
// const payload = {
//   subject: users.userId
// };

// jwt.sign(
//   payload,
//   secret,
//   { expiresIn: "1d" },
//   (err, token) => {
//     res.json({
//       success: true,
//       token
//     });
//   }
// );