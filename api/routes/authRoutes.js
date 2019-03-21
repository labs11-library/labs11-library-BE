const express = require('express');
const router = express.Router();
const passport = require('passport');

// ROUTE:   GET auth/users/google
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// ROUTE:   GET auth/google/redirect
// DESC:    Allow users to authenticate with google
// ACCESS:  Public
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
  res.redirect('/users')
});

module.exports = router; 