const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

// Securely hash passwords stored in env (optional)
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// In-memory credential setup (you can later move this to DB)
const users = [
  {
    role: 'admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    secret: process.env.ADMIN_SECRET
  },
  {
    role: 'driver',
    email: process.env.DRIVER_EMAIL,
    password: process.env.DRIVER_PASSWORD,
    secret: process.env.DRIVER_SECRET
  },
  {
    role: 'packer',
    email: process.env.PACKER_EMAIL,
    password: process.env.PACKER_PASSWORD,
    secret: process.env.PACKER_SECRET
  }
];

//  LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find matching role account
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If no passwords are hashed, simple check (not recommended for production)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { email: user.email, role: user.role },
      user.secret,
      { expiresIn: '2h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

//  REGISTER CONTROLLER (if you want normal user signup)
exports.register = async (req, res) => {
  res.status(403).json({ message: 'Registration disabled for system roles' });
};
