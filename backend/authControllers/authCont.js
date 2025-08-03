const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, contact } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      contact,
      email,
      password: hashed
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    
    const safeUser = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      contact: user.contact,
      email: user.email
    };

    res.status(201).json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    const safeUser = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      contact: user.contact,
      email: user.email
    };

    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
