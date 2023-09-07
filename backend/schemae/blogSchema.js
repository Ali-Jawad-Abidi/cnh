const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    index: { unique: true, dropDups: true },
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  date: {
    type: String,
    required: true,
  },
  addedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addedby",
    required: true,
  },
  info: {
    type: String,
    required: true,
  },

  isMain: {
    type: Boolean,
    required: true,
    default: false,
  },
  isSecondary: {
    type: Boolean,
    required: true,
    default: false,
  },

  thumbnail: {
    type: String,
    required: false,
  },

  disableComments: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Blogs = mongoose.model("blogs", BlogSchema, "blogs");

module.exports = Blogs;
