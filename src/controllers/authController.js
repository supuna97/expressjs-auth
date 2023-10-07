// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { secretKey } = require('../config/database');
const User = require('../models/user');

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create the user in the database
      await User.create({ username, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const [rows] = await User.findByEmail(email);

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = rows[0];
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.DB_SECRET, {
        expiresIn: '1h', // Adjust the expiration time as needed
      });

      res.status(200).json({ token : token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
  },
};

module.exports = authController;
