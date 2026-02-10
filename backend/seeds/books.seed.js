const { Book } = require('../src/models');

const books = [
  {
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    genre: 'Software',
    totalCopies: 5,
  },
  {
    title: 'Design Patterns',
    author: 'Erich Gamma',
    genre: 'Software',
    totalCopies: 3,
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    genre: 'Software',
    totalCopies: 4,
  },
  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    genre: 'Computer Science',
    totalCopies: 2,
  },
];

const seedBooks = async () => {
  for (const data of books) {
    const existing = await Book.findOne({
      where: { title: data.title },
    });

    if (existing) {
      console.log(`Book already exists: ${data.title}`);
      continue;
    }

    await Book.create({
      ...data,
      availableCopies: data.totalCopies,
    });

    console.log(`Book created: ${data.title}`);
  }
};

module.exports = seedBooks;
