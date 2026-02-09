const app = require('./app');
const { initDb } = require('./models');

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
};

startServer();
