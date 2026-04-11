const pool = require('../config/db');
const generateShortCode = require('../utils/generateShortCode');
const Url = require('../models/Url');
const Visit = require('../models/Visit');

class UrlService {
  static async shortenUrl(originalUrl, userId = null) {
    console.log("Sending to shortenUrl:", originalUrl);
    const shortCode = generateShortCode();
    const urlId = await Url.create(originalUrl, shortCode, userId);

    return { id: urlId, shortCode };
  }

  static async getOriginalUrl(shortCode, ip, referrer, userAgent) {
    const [rows] = await pool.query(
      'SELECT * FROM short_links WHERE short_code = ?',
      [shortCode]
    );

    if (rows.length === 0) {
      throw new Error('URL not found');
    }

    const url = rows[0];

    await pool.query(
      'INSERT INTO visits (url_id, ip_address, referrer, user_agent) VALUES (?, ?, ?, ?)',
      [url.id, ip, referrer, userAgent]
    );

    await pool.query(
      'UPDATE short_links SET clicks = clicks + 1 WHERE id = ?',
      [url.id]
    );

    return url.original_url;
  }

  static async getUserUrls(userId) {
    const urls = await Url.getUserUrls(userId);
    console.log("Fetched URLs from model:", urls);
    return urls;
  }

  static async deleteUrl(id, userId) {
    return await Url.deleteUrl(id, userId);
  }
}

module.exports = UrlService;