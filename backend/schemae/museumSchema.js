const mongoose = require("mongoose");

const MuseumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ismuseum: {
    type: Boolean,
    required: true,
  },
  // info: {
  //   type: String,
  // },
});

const Museum = mongoose.model("museum", MuseumSchema, "museum");

module.exports = Museum;
