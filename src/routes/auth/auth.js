const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const {
  createUser,
  getUserByEmail,
  getAllUser,

} = require('../user/user.query');

const {
  getAllTodoforAnId
} = require('../todos/todos.query');

const authRouter = Router();

authRouter.post('/register', async function (req, res) {
  const { email, password, name, firstname } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ msg: 'Account already exists' });
    }

    const user = await createUser(email, password, name, firstname);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET
    );

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

authRouter.post('/login', async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(" Invalid Credentials ");
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

authRouter.get('/user', auth, async function (req, res) {
  try {
    const users = await getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

authRouter.get('/user/todos', auth, async function (req, res) {
  try {
    const todos = await getAllTodoforAnId(req.user.id);

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;
