const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    console.log('User ID:', req.user); // Log the user to ensure it's being set correctly

    const { products } = req.body;
    const userId = req.user.id; // Ensure the user ID is correct

    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      totalAmount += product.price * item.quantity;
    }

    const order = new Order({ user: userId, products, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getOrders = async (req, res) => {
  try {
    // Find orders related to the logged-in user
    const orders = await Order.find({ user: req.user._id }) // Use `_id` here for consistency
      .populate('user', 'username email') // Only return username and email
      .populate('products.product', 'name price'); // Only return name and price for each product

    res.status(200).json(orders); // Send orders back in the response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

module.exports = { createOrder, getOrders };
