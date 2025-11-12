const express = require('express');
const router = express.Router();
const { login } = require('./adminAuth');

// Only admin, driver, or packer login is allowed
router.post('/login', login);

module.exports = router;
