const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const PACKER_EMAIL = process.env.PACKER_EMAIL;
const PACKER_PASSWORD = process.env.PACKER_PASSWORD;
const PACKER_SECRET = process.env.PACKER_SECRET;

// Packer login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === PACKER_EMAIL && password === PACKER_PASSWORD) {
    const token = jwt.sign({ role: 'packer', email }, PACKER_SECRET, { expiresIn: '2h' });
    return res.json({ token, email });
  }

  res.status(401).json({ message: 'Invalid packer credentials' });
});

module.exports = router;
