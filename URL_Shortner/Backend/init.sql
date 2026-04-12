-- Initialize URL Shortener Database
-- Run: mysql -u root -p url_shortner < init.sql

USE url_shortner;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  provider VARCHAR(50) DEFAULT 'local',
  provider_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Short links table
CREATE TABLE short_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  user_id INT,
  clicks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_short_code (short_code),
  INDEX idx_user_id (user_id)
);

-- Visits table
CREATE TABLE visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url_id INT NOT NULL,
  ip_address VARCHAR(45),
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (url_id) REFERENCES short_links(id) ON DELETE CASCADE,
  INDEX idx_url_id (url_id),
  INDEX idx_created_at (created_at)
);

-- Sample data
INSERT INTO users (username, email, password, provider) VALUES 
('testuser', 'test@example.com', '$2a$10$examplehash', 'local');
