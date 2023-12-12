import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticateUser = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (bearerToken) {
      const token = bearerToken.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: 'Token required' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authorizeUser = async (req, res, next) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

export { authenticateUser, authorizeUser };
