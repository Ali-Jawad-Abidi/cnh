const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true, dropDups: true },
    required: true,
  },
  email: {
    type: String,
    index: { unique: true, dropDups: true },
  },
  country: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  authenticationtype: {
    type: String,
    required: true,
    default: "Standard",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  likedconsoles: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  likedblogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  myconsoles: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  image: {
    type: String,
    required: false,
  },
  wallet: {
    prevBits: { type: Number, required: false, default: 0 },
    bits: { type: Number, required: false, default: 0 },
  },

  verified: {
    type: Boolean,
    default: false,
  },
  isPremium: {
    type: Boolean,
    default: false,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  myOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  bitshistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  patreon_id: {
    type: String,
  },
  patreon_full_name: { type: String },
  patreon_email: { type: String },
  patreon_access_token: { type: String },

  last_login: {
    type: Date,
    default: Date.now,
  },
  consecutive_logins: {
    type: Number,
    default: 1,
  },
  salt: {
    type: String,
    required: false,
  },
  externalid: {
    type: String,
    required: false,
  },
  isexternalaccount: {
    type: Boolean,
    required: true,
    default: false,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: true,
  },
  twoFactorSetup: {
    type: Boolean,
    default: false,
  },
  isPatreonMember: {
    type: Boolean,
    default: false,
  },
  pledgeAmount: {
    type: Number,
  },
  joinedDate: {
    type: Date,
    default: null,
  },
  otpauth_url: {
    type: String,
    default: "",
  },
  twoFactorSecret: {
    type: String,
  },
});

const User = mongoose.model("users", UserSchema, "users");

module.exports = User;
