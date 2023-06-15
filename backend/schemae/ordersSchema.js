const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderid: { type: String, required: true },
  cart: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
      img: { type: String, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
      title: { type: String, required: true },
    },
  ],
  status: { type: String, required: true, default: "Purchased" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  total: { type: Number, required: true },
  date: { type: String, required: true },

  payer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    payerid: { type: String, required: true },
  },

  shipping: {
    address_line_1: { type: String, required: true },
    address_line_2: { type: String, required: true },
    admin_area_2: { type: String, required: true },
    admin_area_1: { type: String, required: true },
    postal_code: { type: String, required: true },
    country_code: { type: String, required: true },
  },
});

const Orders = mongoose.model("orders", OrderSchema, "orders");

module.exports = Orders;
