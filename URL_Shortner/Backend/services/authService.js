const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

class AuthService {
  static async registerUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ username, email, password: hashedPassword });
  }

  static async loginUser(email, password) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('User not found');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    
    return this.generateToken(user);
  }

  static async handleOAuthLogin(profile) {
    const user = await User.findOrCreateOAuthUser(profile);
    return this.generateToken(user);
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  static verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}

module.exports = AuthService;