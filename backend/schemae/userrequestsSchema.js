const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: false,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  Bits: { type: Number, required: true },
  BitsString: { type: String, required: true },
  BitsDate: { type: Date, required: true },
  BitsStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Deducted"], // Possible enum values
    required: true,
    default: "Pending",
  },
});

const Requests = mongoose.model("requests", RequestSchema, "requests");

module.exports = Requests;
