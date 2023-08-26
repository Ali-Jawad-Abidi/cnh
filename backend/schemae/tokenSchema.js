const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    authtype: {
      type: String,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Add the index for automatic token expiration
TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1200 }); // 1200 seconds = 20 minutes

const Token = mongoose.model("tokens", TokenSchema, "tokens");

module.exports = Token;
