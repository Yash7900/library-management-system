const { initDb } = require('../src/models');
const seedUsers = require('./users.seed');
const seedBooks = require('./books.seed');

const runSeeds = async () => {
  try {
    await initDb();
    await seedUsers();
    await seedBooks();
    console.log('Seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
};

runSeeds();
