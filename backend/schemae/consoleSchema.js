const mongoose = require("mongoose");

const ConsoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalunits: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    required: true,
  },
  desire: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  releasetype: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  regionalcode: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  addedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addedby",
    required: true,
  },
  userwhoadded: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  subcat: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  whereami: {
    isavailable: { type: Boolean, required: true, default: false },
    location: { type: String, default: "" },
    to: { type: String, default: "" },
    from: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  releasedate: {
    type: String,
    required: true,
  },
  isowned: {
    type: Boolean,
    default: false,
  },
  links: {
    type: Array,
    default: ["", "", ""],
  },
  rating: {
    type: Number,
    default: 5,
  },
  commonfaults: [{ type: mongoose.Schema.Types.ObjectId }],

  thumbnail: {
    type: String,
    required: false,
  },
});

const Console = mongoose.model("consoles", ConsoleSchema, "consoles");
module.exports = Console;
