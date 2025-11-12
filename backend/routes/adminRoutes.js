// backend/routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const { Driver, Packer } = require("../models");

const router = express.Router();

// Environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Rate limit login attempts
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: { message: "Too many login attempts. Try again later." },
});

// ===============================
// Unified Login Route (Admin, Driver, Packer)
// ===============================
router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    //  Admin Login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "8h" });

      return res.json({
        token,
        role: "admin",
        message: "Admin login successful",
      });
    }

    //  Driver Login
    const driver = await Driver.findOne({ where: { email } });
    if (driver) {
      const match = await bcrypt.compare(password, driver.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: driver.id, role: "driver" }, JWT_SECRET, { expiresIn: "8h" });
      return res.json({
        token,
        role: "driver",
        name: driver.name,
        email: driver.email,
        message: "Driver login successful",
      });
    }

    //  Packer Login
    const packer = await Packer.findOne({ where: { email } });
    if (packer) {
      const match = await bcrypt.compare(password, packer.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: packer.id, role: "packer" }, JWT_SECRET, { expiresIn: "8h" });
      return res.json({
        token,
        role: "packer",
        name: packer.name,
        email: packer.email,
        message: "Packer login successful",
      });
    }

    // No Match
    return res.status(401).json({ message: "User not found or unauthorized role" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
