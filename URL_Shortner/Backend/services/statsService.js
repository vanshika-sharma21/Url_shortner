const Url = require('../models/Url');
const Visit = require('../models/Visit');
const pool = require('../config/db'); // ✅ Corrected path to MySQL pool


class StatsService {
  static async getUserStats(userId) {
    const urls = await Url.getUserUrls(userId);
    const urlIds = urls.map(url => url.id);
    
    if (urlIds.length === 0) {
      return {
        totalUrls: 0,
        totalClicks: 0,
        clicksLast7Days: [],
        topUrls: []
      };
    }
    
    // Total clicks
    const [totalClicks] = await pool.query(
      'SELECT SUM(clicks) as total FROM urls WHERE user_id = ?',
      [userId]
    );
    
    // Clicks last 7 days
    const [clicksLast7Days] = await pool.query(`
      SELECT DATE(visits.created_at) as date, COUNT(*) as count
      FROM visits
      JOIN urls ON visits.url_id = urls.id
      WHERE urls.user_id = ? AND visits.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(visits.created_at)
      ORDER BY date ASC
    `, [userId]);
    
    // Top 5 URLs
    const [topUrls] = await pool.query(`
      SELECT id, original_url, short_code, clicks
      FROM urls
      WHERE user_id = ?
      ORDER BY clicks DESC
      LIMIT 5
    `, [userId]);
    
    return {
      totalUrls: urls.length,
      totalClicks: totalClicks[0].total || 0,
      clicksLast7Days,
      topUrls
    };
  }

  static async getUrlStats(urlId, userId) {
    // Verify user owns the URL
    const [url] = await pool.query('SELECT * FROM urls WHERE id = ? AND user_id = ?', [urlId, userId]);
    if (url.length === 0) throw new Error('URL not found or access denied');

    
    const stats = await Visit.getStatsByUrlId(urlId);
    return stats;
  }
}

module.exports = StatsService;