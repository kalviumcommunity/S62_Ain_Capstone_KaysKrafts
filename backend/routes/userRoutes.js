const express = require('express');
const { createUser, getUsers } = require('../controllers/userController'); // ✅ both imported
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

router.post('/', createUser);
router.get('/', protect, getUsers); // Protect the GET route so only authenticated users can access

module.exports = router;
