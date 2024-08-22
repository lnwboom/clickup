const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/me', authMiddleware, async (req, res) => {
  res.send({ user: req.user });
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (error) {
    res.status(400).json({ message: 'Signup failed', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ 
      user: { id: user._id, username: user.username, email: user.email },
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Logout
router.post('/logout', authMiddleware, (req, res) => {
  // Since we're using JWT, we don't need to destroy a session.
  // The client should remove the token on their end.
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;