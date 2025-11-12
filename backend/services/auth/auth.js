const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models'); 
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Create JWT token with user ID and email
const createToken = async (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });
};

// Hash password using bcrypt
const authHash = async (password) => {
  if (!password) throw new Error("Password is required for hashing.");
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare hashed password with plain password
const compareHash = async ({ userPass, dbPass }) => {
  return await bcrypt.compare(userPass, dbPass);
};

// Middleware to verify token from Authorization header
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach full user object
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(403).json({ message: 'Invalid token' });
  }

  
};

module.exports = {
  createToken,
  compareHash,
  authHash,
  verifyToken,
};
