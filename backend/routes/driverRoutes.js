const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const DRIVER_EMAIL = process.env.DRIVER_EMAIL;
const DRIVER_PASSWORD = process.env.DRIVER_PASSWORD;
const DRIVER_SECRET = process.env.DRIVER_SECRET;

// Driver login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === DRIVER_EMAIL && password === DRIVER_PASSWORD) {
    const token = jwt.sign({ role: 'driver', email }, DRIVER_SECRET, { expiresIn: '2h' });
    return res.json({ token, email });
  }

  res.status(401).json({ message: 'Invalid driver credentials' });
});

module.exports = router;
