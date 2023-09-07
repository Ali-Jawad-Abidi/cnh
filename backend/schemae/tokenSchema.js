// const mongoose = require("mongoose");

// const TokenSchema = new mongoose.Schema(
//   {
//     token: {
//       type: String,
//       required: true,
//     },
//     authtype: {
//       type: String,
//       required: true,
//     },
//     userid: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//   },
//   {
//     timestamps: true, // Add createdAt and updatedAt fields
//   }
// );

// // Add the index for automatic token expiration
// TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1200 }); // 1200 seconds = 20 minutes

// const Token = mongoose.model("tokens", TokenSchema, "tokens");

// module.exports = Token;

const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who owns this token
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
    // Include an expiration time for access tokens
    expires: "30m", // Automatically remove documents after 20 minutes
  },
  refreshToken: {
    type: String,
    required: true,
    // Include an expiration time for refresh tokens
    expires: "7d", // Automatically remove documents after 30 days
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
