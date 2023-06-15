const mongoose = require("mongoose");

const MerchCatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  merch: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const MerchCat = mongoose.model("merchcat", MerchCatSchema, "merchcat");

module.exports = MerchCat;
