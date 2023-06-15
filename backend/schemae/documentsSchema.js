const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isdocument: {
    type: Boolean,
    default: true,
  },
});

const Documents = mongoose.model("documents", DocumentSchema, "documents");
module.exports = Documents;
