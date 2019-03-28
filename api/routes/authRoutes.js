const express = require("express");
const router = express.Router();
const passport = require("passport");

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
  // console.log("req.query", req.query);  
  let token = req.query.code;
  res.redirect("http://localhost:3000?token=" + token);
});

// ROUTE:   GET auth/users/facebook
// DESC:    Allow users to authenticate with facebook
// ACCESS:  Public
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
