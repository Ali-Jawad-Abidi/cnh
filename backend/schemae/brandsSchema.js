const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  variations: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    required: true,
  },
  subcats: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  thumbnail: {
    type: String,
    required: false,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Brands = mongoose.model("brands", BrandSchema, "brands");

module.exports = Brands;
