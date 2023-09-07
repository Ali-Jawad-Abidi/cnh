const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderid: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, required: true, default: "Purchased" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  total: { type: Number, required: false },
  date: { type: String, required: true },

  payer: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    payerid: { type: String, required: false },
  },

  shipping: {
    address_line_1: { type: String, required: false },
    address_line_2: { type: String, required: false },
    admin_area_2: { type: String, required: false },
    admin_area_1: { type: String, required: false },
    postal_code: { type: String, required: false },
    country_code: { type: String, required: false },
  },
});

const Orders = mongoose.model("orders", OrderSchema, "orders");

module.exports = Orders;
