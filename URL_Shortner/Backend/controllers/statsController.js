const StatsService = require('../services/statsService');

exports.getUserStats = async (req, res) => {
  try {
    const stats = await StatsService.getUserStats(req.user.id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUrlStats = async (req, res) => {
  try {
    const { urlId } = req.params;
    const stats = await StatsService.getUrlStats(urlId, req.user.id);
    res.json(stats);
  } catch (error) {
    res.status(404).json({ error: error.message || 'URL not found for user.' });

  }
};