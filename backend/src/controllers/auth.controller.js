const bcrypt = require('bcrypt');
const { User } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const payload = { id: user.id, role: user.role };

  res.json({
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  });
};
