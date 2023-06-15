const mongoose = require("mongoose");

const MerchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    required: false,
  },
  bits: {
    type: Boolean,
    default: false,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: "",
  },
  category: {
    type: String,
    required: true,
  },
});

const Merch = mongoose.model("merch", MerchSchema, "merch");

module.exports = Merch;
