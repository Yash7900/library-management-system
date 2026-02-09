const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

const generateAccessToken = (payload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
