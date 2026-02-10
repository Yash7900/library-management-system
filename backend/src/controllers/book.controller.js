const { Book } = require('../models');

// Create
const createBook = async (req, res) => {
    const { title, author, genre, totalCopies } = req.body;

    const book = await Book.create({
        title,
        author,
        genre,
        totalCopies,
        availableCopies: totalCopies,
    });
    
    res.status(201).json(book);
};

// Get all books
const getAllBooks = async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
};

// Update
const updateBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const { title, author, genre, totalCopies } = req.body;
    
    
    // If totalCopies is updated, adjust availableCopies accordingly
    if (totalCopies !== undefined) {
        if (totalCopies < book.totalCopies - book.availableCopies) {
            return res.status(400).json({ message: 'Cannot reduce total copies below borrowed count' });
        }
        book.availableCopies += (totalCopies - book.totalCopies);
        book.totalCopies = totalCopies;
    }
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    
    await book.save();
    res.json(book);
};

// Delete
const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    await book.destroy();

    res.status(204).json({message: 'Book deleted' });
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};