const { Borrow, Book } = require('../models');

const BORROW_DAYS = 14;
const RENEW_DAYS = 7;

// Borrow a book
exports.borrowBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  const book = await Book.findByPk(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (book.availableCopies <= 0) {
    return res.status(400).json({ message: 'No copies available' });
  }

  const existing = await Borrow.findOne({
    where: {
      UserId: userId,
      BookId: bookId,
      returnedAt: null,
    },
  });

  if (existing) {
    return res.status(400).json({ message: 'Book already borrowed' });
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + BORROW_DAYS);

  const borrow = await Borrow.create({
    UserId: userId,
    BookId: bookId,
    dueDate,
  });

  book.availableCopies -= 1;
  await book.save();

  res.status(201).json(borrow);
};

// Return book
exports.returnBook = async (req, res) => {
  const userId = req.user.id;
  const { borrowId } = req.body;

  const borrow = await Borrow.findByPk(borrowId, { include: Book });
  if (!borrow || borrow.returnedAt) {
    return res.status(404).json({ message: 'Borrow record not found' });
  }

  if (borrow.UserId !== userId) {
    return res.status(403).json({ message: 'Not your borrowed book' });
  }

  borrow.returnedAt = new Date();
  await borrow.save();

  borrow.Book.availableCopies += 1;
  await borrow.Book.save();

  res.json({ message: 'Book returned' });
};

// Renew book
exports.renewBook = async (req, res) => {
  const userId = req.user.id;
  const { borrowId } = req.body;

  const borrow = await Borrow.findByPk(borrowId);
  if (!borrow || borrow.returnedAt) {
    return res.status(404).json({ message: 'Borrow record not found' });
  }

  if (borrow.UserId !== userId) {
    return res.status(403).json({ message: 'Not your borrowed book' });
  }

  if (borrow.renewCount >= 1) {
    return res.status(400).json({ message: 'Renew limit reached' });
  }

  if (new Date() > borrow.dueDate) {
    return res.status(400).json({ message: 'Book overdue, cannot renew' });
  }

  borrow.dueDate.setDate(borrow.dueDate.getDate() + RENEW_DAYS);
  borrow.renewCount += 1;
  await borrow.save();

  res.json(borrow);
};
