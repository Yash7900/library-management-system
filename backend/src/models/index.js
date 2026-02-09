const sequelize = require('../database');

const User = require('./user.model');
const Book = require('./book.model');

const initDb = async () => {
  let retries = 5;

  while (retries) {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database connected & synced');
      break;
    } catch (err) {
      retries -= 1;
      console.log('DB not ready, retrying...', retries);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

module.exports = {
  sequelize,
  User,
  Book,
  initDb,
};
