const express = require('express');
const passport = require('passport');
const router = express.Router();
const statsController = require('../controllers/statsController');

// 👇 ADD authentication middleware
router.get('/user', passport.authenticate('jwt', { session: false }), statsController.getUserStats);

router.get('/url/:urlId', passport.authenticate('jwt', { session: false }), statsController.getUrlStats);

module.exports = router;
