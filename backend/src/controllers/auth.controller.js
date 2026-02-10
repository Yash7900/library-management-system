const bcrypt = require('bcrypt');
const { User, RefreshToken } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/jwt');
const { hashToken } = require('../utils/hash');

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

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await RefreshToken.create({
    tokenHash: hashToken(refreshToken),
    UserId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.json({ accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Missing refresh token' });
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({
    where: { tokenHash },
  });

  if (!storedToken) {
    return res.status(401).json({ message: 'Refresh token revoked' });
  }

  // Rotate token
  await storedToken.destroy();

  const newPayload = { id: payload.id, role: payload.role };

  const newAccessToken = generateAccessToken(newPayload);
  const newRefreshToken = generateRefreshToken(newPayload);

  await RefreshToken.create({
    tokenHash: hashToken(newRefreshToken),
    UserId: payload.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Missing refresh token' });
  }

  await RefreshToken.destroy({
    where: { tokenHash: hashToken(refreshToken) },
  });

  res.json({ message: 'Logged out' });
};
