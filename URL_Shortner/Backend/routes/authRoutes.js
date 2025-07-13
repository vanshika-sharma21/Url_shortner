const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const User = require('../models/User');

// Local auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    console.log("Decoded JWT payload (req.user):", req.user); // DEBUG
    const user = await User.findById(req.user.id);
    console.log("User from DB:", user); // DEBUG

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error("Error in /me route:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  authController.oauthCallback
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  authController.oauthCallback
);

module.exports = router;