const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      bitsSpent: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  expiryTime: {
    type: Date,
    required: true,
  },
  total: {},
});

const Cart = mongoose.model("cart", CartSchema, "cart");

module.exports = Cart;
