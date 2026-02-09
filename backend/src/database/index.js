const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'library_db',
  process.env.DB_USER || 'library_user',
  process.env.DB_PASSWORD || 'library_pass',
  {
    host: process.env.DB_HOST || 'postgres',
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
