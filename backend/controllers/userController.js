const User = require('../models/User');

// Create a new user (existing function)
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get logged-in user (updated function to return only the authenticated user)
const getUsers = async (req, res) => {
  try {
    // Use the user ID stored in req.user (from the token validation middleware)
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with only the logged-in user's data
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createUser, getUsers };
