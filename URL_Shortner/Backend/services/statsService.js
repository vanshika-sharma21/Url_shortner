const Url = require('../models/Url');
const Visit = require('../models/Visit');
const pool = require('../config/db');

class StatsService {
  static async getUserStats(userId) {
    const urls = await Url.getUserUrls(userId);

    if (urls.length === 0) {
      return {
        totalUrls: 0,
        totalClicks: 0,
        clicksLast7Days: [],
        topUrls: []
      };
    }

    const [totalClicks] = await pool.query(
      'SELECT SUM(clicks) as total FROM short_links WHERE user_id = ?',
      [userId]
    );

    const [clicksLast7Days] = await pool.query(
      `SELECT DATE(visits.created_at) as date, COUNT(*) as count
       FROM visits
       JOIN short_links ON visits.url_id = short_links.id
       WHERE short_links.user_id = ? 
       AND visits.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       GROUP BY DATE(visits.created_at)
       ORDER BY date ASC`,
      [userId]
    );

    const [topUrls] = await pool.query(
      `SELECT id, original_url, short_code, clicks
       FROM short_links
       WHERE user_id = ?
       ORDER BY clicks DESC
       LIMIT 5`,
      [userId]
    );

    return {
      totalUrls: urls.length,
      totalClicks: totalClicks[0].total || 0,
      clicksLast7Days,
      topUrls
    };
  }

  static async getUrlStats(urlId, userId) {
    const [url] = await pool.query(
      'SELECT * FROM short_links WHERE id = ? AND user_id = ?',
      [urlId, userId]
    );

    if (url.length === 0) {
      throw new Error('URL not found or access denied');
    }

    const stats = await Visit.getStatsByUrlId(urlId);
    return stats;
  }
}

module.exports = StatsService;