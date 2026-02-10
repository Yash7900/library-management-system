const { Borrow, Book, User } = require('../models');
const { calculateFine } = require('../utils/fine');
const { Op } = require('sequelize');

// For users: their own overdue books
exports.myOverdues = async (req, res) => {
  const userId = req.user.id;

  const borrows = await Borrow.findAll({
    where: {
      UserId: userId,
      returnedAt: null,
      dueDate: { [Op.lt]: new Date() },
    },
    include: [Book],
  });

  const result = borrows.map(b => ({
    borrowId: b.id,
    book: b.Book.title,
    dueDate: b.dueDate,
    fine: calculateFine(b),
  }));

  res.json(result);
};

// For librarians: all overdues
exports.allOverdues = async (req, res) => {
  const borrows = await Borrow.findAll({
    where: {
      returnedAt: null,
      dueDate: { [Op.lt]: new Date() },
    },
    include: [Book, User],
  });

  const result = borrows.map(b => ({
    user: b.User.email,
    book: b.Book.title,
    dueDate: b.dueDate,
    fine: calculateFine(b),
  }));

  res.json(result);
};
