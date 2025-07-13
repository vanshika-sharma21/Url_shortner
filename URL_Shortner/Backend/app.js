require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const passport = require('passport');
require('./middleware/auth');

const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const statsRoutes = require('./routes/statsRoutes');
const UrlService = require('./services/urlService');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/api/stats', statsRoutes);
app.get('/:shortCode', async (req, res) => {
  try {
    const originalUrl = await UrlService.getOriginalUrl(
      req.params.shortCode,
      req.ip,
      req.get('Referer'),
      req.get('User-Agent')
    );
    res.redirect(originalUrl);
  } catch (err) {
    console.error('Redirect error:', err.message);
    res.status(404).send('Short URL not found');
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;