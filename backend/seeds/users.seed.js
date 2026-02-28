const { User } = require('../src/models');

const seedUsers = async () => {
  const email = 'admin@library.com';

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log('Librarian already exists');
    return;
  }

  await User.create({
    name: 'Head Librarian',
    email,
    password: 'admin123',
    role: 'LIBRARIAN',
  });

  console.log('Librarian user created');
};

module.exports = seedUsers;
