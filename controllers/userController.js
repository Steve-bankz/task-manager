const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

// creating a user
const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const user = new User({ name, email, password });
      await user.save();
  
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Step 1: Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Step 2: Find user
      const user = await User.findOne({ email });
      if (!user || typeof user.password !== 'string') {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Step 3: Compare passwords (must be strings)
      const isMatch = await bcrypt.compare(password.toString(), user.password.toString());
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Step 4: Generate token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
      console.log(err)
    }
  };

  module.exports = {
    createUser,
    loginUser
  }
