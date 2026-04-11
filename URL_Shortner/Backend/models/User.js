const pool = require('../config/db')
class User {
    static async findByEmail(email) {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    }
  
    static async findById(id) {
      console.log("Looking for user by ID:", id);
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    }
  
    static async create({ username, email, password, provider = 'local', provider_id = null }) {
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password, provider, provider_id) VALUES (?, ?, ?, ?, ?)',
        [username, email, password, provider, provider_id]
      );
      return result.insertId;
    }
  
    static async findOrCreateOAuthUser(profile) {
      // Check if user exists
      const [existing] = await pool.query(
        'SELECT * FROM users WHERE provider = ? AND provider_id = ?',
        [profile.provider, profile.id]
      );
      
      if (existing.length > 0) return existing[0];
      
      // Create new user
      const newUser = {
        username: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value || null,
        provider: profile.provider,
        provider_id: profile.id
      };
      
      const userId = await this.create(newUser);
      return await this.findById(userId);
    }
  }
  
  module.exports = User;