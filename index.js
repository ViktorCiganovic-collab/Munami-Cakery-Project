const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 3002;
// Use the MONGO_URI environment variable
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose model for orders
const orderSchema = new mongoose.Schema({
    name_checkout: { type: String, required: true },
    email_checkout: { type: String, required: true },
    products: [{
        product: { type: String, required: true },
        quantity: { type: Number, required: true }
    }]
});

const Order = mongoose.model('Order', orderSchema);

// POST route for order submission
app.post('/submit_order', async (req, res) => {
    const { name_checkout, email_checkout, products } = req.body;

    // Check if products are provided
    if (!products || products.length === 0) {
        return res.status(400).send('You must add at least one product to your order.');
    }

    const newOrder = new Order({ name_checkout, email_checkout, products });

    try {
        await newOrder.save();
        res.status(201).send('<h1>Thank you. Your order has been placed successfully!</h1>');
    } catch (error) {
        res.status(400).send('Error saving order: ' + error.message);
    }
});


//This is route handler for post requests when customers use form to send questions or comments
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: {type: String, required: true}  
});

const Comment = mongoose.model('Comment', commentSchema); 

app.post('/submit', async (req, res) => {
  const { name ,email, comment } = req.body;
  const newComment = new Comment({ name, email, comment });
  console.log(req.body); // Log the incoming data

  try {
  await newComment.save();  
  return res.status(201).send('<h1>Thanks for your email. We have received your query and will get back to you within 24 hours</h1>');
  } catch (error) {
    return res.status(400).send('Error saving comment' + error.message);
  }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
