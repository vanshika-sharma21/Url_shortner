const pool = require('../config/db');

class Url {
  static async create(originalUrl, shortCode, userId = null) {
    const [result] = await pool.query(
      'INSERT INTO short_links (original_url, short_code, user_id) VALUES (?, ?, ?)',
      [originalUrl, shortCode, userId]
    );
    return result.insertId;
  }

  static async findByShortCode(shortCode) {
    const [rows] = await pool.query(
      'SELECT * FROM short_links WHERE short_code = ?',
      [shortCode]
    );
    return rows[0];
  }

  static async incrementClicks(shortCode) {
    await pool.query(
      'UPDATE short_links SET clicks = clicks + 1 WHERE short_code = ?',
      [shortCode]
    );
  }

  static async getUserUrls(userId) {
    const [rows] = await pool.query(
      'SELECT id, original_url, short_code, clicks, created_at FROM short_links WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async deleteUrl(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM short_links WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Url;