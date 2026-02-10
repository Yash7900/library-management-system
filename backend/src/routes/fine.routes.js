const express = require('express');
const { myOverdues, allOverdues } = require('../controllers/fine.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();

router.get('/my', authenticate, myOverdues);
router.get(
  '/all',
  authenticate,
  authorizeRoles('LIBRARIAN'),
  allOverdues
);

module.exports = router;
