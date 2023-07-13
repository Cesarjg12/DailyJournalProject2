var express = require('express');
var router = express.Router();
const passport = require('passport');
var ensureLoggedIn = require('../config/ensureLoggedIn');
var journalCtrl = require('../controllers/journal');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Daily Journal' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/journals',
    failureRedirect: '/journals'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/journals');
  });
});

router.get('/journals', journalCtrl.index);
router.post('/journals', ensureLoggedIn, journalCtrl.create);
router.get('/journals/new', ensureLoggedIn, journalCtrl.new);
router.get('/journals/:id', journalCtrl.show);

module.exports = router;