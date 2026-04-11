const express = require('express');
const router = express.Router();
const passport = require('passport');
const urlController = require('../controllers/urlController');

// Public route (no JWT required)
router.post('/shorten', urlController.shortenUrl);
router.get('/:shortCode', urlController.redirectUrl);

// Protected routes
router.use(passport.authenticate('jwt', { session: false }));

router.get('/user/urls', urlController.getUserUrls);
router.get('/stats/user', urlController.getUserStats);
router.delete('/:id', urlController.deleteUrl);

module.exports = router;