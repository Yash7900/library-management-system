const express = require('express');
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
} = require('../controllers/book.controller');

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();

// Logged in users can view books
router.get('/', authenticate, getAllBooks);
router.get('/:id', authenticate, getBookById);

// librarians only
router.post('/', authenticate, authorizeRoles('LIBRARIAN'), createBook);
router.put('/:id', authenticate, authorizeRoles('LIBRARIAN'), updateBook);
router.delete('/:id', authenticate, authorizeRoles('LIBRARIAN'), deleteBook);

module.exports = router;