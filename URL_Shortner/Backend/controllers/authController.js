const AuthService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await AuthService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.oauthCallback = async (req, res) => {
  try {
    const token = await AuthService.handleOAuthLogin(req.user);
    // Redirect with token to frontend
    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=${error.message}`);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw new Error('User not found');
    res.json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};