const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();

// Any logged-in user
router.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'Profile data',
    user: req.user,
  });
});

// Librarian-only
router.get(
  '/admin',
  authenticate,
  authorizeRoles('LIBRARIAN'),
  (req, res) => {
    res.json({ message: 'Librarian access granted' });
  }
);

module.exports = router;
