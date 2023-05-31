const { Router } = require('express');
const auth = require('../../middleware/auth');

const {
  deleteUser,
  getUserById,
  updateUser,
  getUserByEmail
} = require('./user.query');

const usersRouter = Router();

usersRouter.get('/:idOrEmail', auth, async function (req, res) {
  const { idOrEmail } = req.params;
  
  try {
    let user;
    if (isNaN(idOrEmail)) {
      user = await getUserByEmail(idOrEmail);
    } else {
      user = await getUserById(idOrEmail);
    }

    if (!user) {
      throw new Error('User not found');
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


usersRouter.put('/:id', auth, async function (req, res) {
  const userId = req.params.id;
  const { name, firstname, email, password } = req.body;

  try {
    const user = await getUserById(userId);

    if (!user) {
      throw new Error('user not found');
    }

    await updateUser(userId, email, password, name, firstname);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

usersRouter.delete('/:id', auth, async function (req, res) {
  const userId = req.params.id;

  try {
    const user = await getUserById(userId);

    if (!user) {
      throw new Error('user not found');
    }

    await deleteUser(userId);
    
    return res.status(200).json(`Successfully deleted record number: ${userId}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = usersRouter;
