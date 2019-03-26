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
  var token = req.userData.token;
  console.log("ud", req)
  res.redirect("http://localhost:3000/?token=" + token );
});

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

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/users",
    failureRedirect: "/auth/facebook"
  })
);
module.exports = router;
