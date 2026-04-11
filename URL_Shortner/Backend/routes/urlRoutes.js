const express = require('express');
const router = express.Router();
const passport = require('passport');
const urlController = require('../controllers/urlController');

// Public route (NO JWT)
console.log("Controller Methods:", urlController);


// 🔐 Authenticated routes (JWT protected)
router.use(passport.authenticate('jwt', { session: false }));

router.post('/shorten', urlController.shortenUrl);
router.get('/user/urls', urlController.getUserUrls);
router.get('/stats/user', urlController.getUserStats); // ✅ ADD THIS LINE
router.delete('/:id', urlController.deleteUrl);

module.exports = router;
