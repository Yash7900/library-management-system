const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Borrow = sequelize.define('Borrow', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  borrowedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  renewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Borrow;
