const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ this must decode JWT and set req.user

const router = express.Router();

// Protected Routes
router.post('/',authMiddleware.protect, createOrder);
router.get('/', authMiddleware.protect, getOrders);

module.exports = router;
