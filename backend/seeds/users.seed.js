const bcrypt = require('bcrypt');
const { User } = require('../src/models');

const seedUsers = async () => {
  const email = 'admin@library.com';

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log('Librarian already exists');
    return;
  }

  const passwordHash = await bcrypt.hash('admin123', 10);

  await User.create({
    name: 'Head Librarian',
    email,
    password: passwordHash,
    role: 'LIBRARIAN',
  });

  console.log('Librarian user created');
};

module.exports = seedUsers;
