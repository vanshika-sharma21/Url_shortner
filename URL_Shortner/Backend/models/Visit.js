class Visit {
    static async recordVisit(urlId, ip, referrer, userAgent) {
      await pool.query(
        'INSERT INTO visits (url_id, ip_address, referrer, user_agent) VALUES (?, ?, ?, ?)',
        [urlId, ip, referrer || null, userAgent || null]
      );
    }
  
    static async getVisitsByUrlId(urlId) {
      const [rows] = await pool.query('SELECT * FROM visits WHERE url_id = ? ORDER BY created_at DESC', [urlId]);
      return rows;
    }
  
    static async getStatsByUrlId(urlId) {
      // Daily clicks
      const [daily] = await pool.query(`
        SELECT DATE(created_at) as date, COUNT(*) as count 
        FROM visits 
        WHERE url_id = ? 
        GROUP BY DATE(created_at) 
        ORDER BY date DESC
        LIMIT 7
      `, [urlId]);
  
      // Referrers
      const [referrers] = await pool.query(`
        SELECT referrer, COUNT(*) as count 
        FROM visits 
        WHERE url_id = ? AND referrer IS NOT NULL
        GROUP BY referrer 
        ORDER BY count DESC
        LIMIT 5
      `, [urlId]);
  
      // User agents
      const [devices] = await pool.query(`
        SELECT 
          CASE 
            WHEN user_agent LIKE '%Mobile%' THEN 'Mobile'
            WHEN user_agent LIKE '%Tablet%' THEN 'Tablet'
            ELSE 'Desktop'
          END as device,
          COUNT(*) as count
        FROM visits
        WHERE url_id = ?
        GROUP BY device
      `, [urlId]);
  
      return { daily, referrers, devices };
    }
  }
  
  module.exports = Visit;