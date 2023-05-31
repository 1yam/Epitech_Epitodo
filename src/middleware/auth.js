const jwt = require('jsonwebtoken');
const { getUserById } = require('../routes/user/user.query');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('No token, authorization denied');
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await getUserById(decoded.id);
    if (!user) {
      throw new Error('No user found');
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });

  }
};
