const pool = require('../config/db'); // ✅ correct

class Url {
    static async create(originalUrl, shortCode, userId = null) {
      const [result] = await pool.query(
        'INSERT INTO urls (original_url, short_code, user_id) VALUES (?, ?, ?)',
        [originalUrl, shortCode, userId]
      );
      return result.insertId;
    }
  
    static async findByShortCode(shortCode) {
      const [rows] = await pool.query('SELECT * FROM urls WHERE short_code = ?', [shortCode]);
      return rows[0];
    }
  
    static async incrementClicks(shortCode) {
      await pool.query('UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?', [shortCode]);
    }
  
    static async getUserUrls(userId) {
      const [rows] = await pool.query('SELECT * FROM urls WHERE user_id = ? ORDER BY created_at DESC', [userId]);
      return rows;
    }
  
    static async deleteUrl(id, userId) {
      const [result] = await pool.query('DELETE FROM urls WHERE id = ? AND user_id = ?', [id, userId]);
      return result.affectedRows > 0;
    }

static async getUserUrls(userId) {
  const [rows] = await pool.query(
    'SELECT id, original_url, short_code, clicks FROM urls WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
}



}
  
  module.exports = Url;