const express = require('express');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const todoRoutes = require('./routes/todos/todos');

const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

const port = process.env.PORT || 3000;

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
