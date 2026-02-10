const express = require('express');
const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
const bookRoutes = require('./routes/book.routes');
const borrowRoutes = require('./routes/borrow.routes');
const fineRoutes = require('./routes/fine.routes');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/fines', fineRoutes);

//  Test routes for authentication and role-based access control
app.use('/api/test', testRoutes);

module.exports = app;
