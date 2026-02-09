const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
  },
  totalCopies: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableCopies: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;
