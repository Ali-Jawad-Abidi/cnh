const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  posttype: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  profilephoto: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comments", CommentSchema, "comments");

module.exports = Comment;
