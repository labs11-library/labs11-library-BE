const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy;
  res.redirect("http://localhost:3000");
});

// ROUTE:   GET auth/users/google
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// ROUTE:   GET auth/google/redirect
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  let token = req.user.token;
  res.cookie("auth", token);
  res.redirect("http://localhost:3000?token=" + token);
});

// router.get(
//   "/google/redirect",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("http://localhost:3000/");
//   }
// );

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
// router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "user_photos"]
  })
);

// ROUTE:   GET auth/facebook/callback
// DESC:    Allow users to authenticate with facebook
// ACCESS:  Public
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/users",
    failureRedirect: "/auth/facebook"
  })
);
module.exports = router;
