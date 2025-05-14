const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // ✅ Importing CORS middleware

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // ✅ Enable CORS

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRoutes);         // ✅ Login route
app.use('/api/products', productRoutes);  // ✅ Product route
app.use('/api/users', userRoutes);        // ✅ User route
app.use('/api/orders', orderRoutes);      // ✅ Order route

app.get('/', (req, res) => {
  res.send('Kay\'s Krafts API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
