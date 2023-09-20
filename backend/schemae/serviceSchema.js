const mongoose = require("mongoose");

const ServiceSchmea = new mongoose.Schema({
  console: {
    type: String,
    required: true,
  },

  upgradeOptions: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  repairOptions: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  sparePartsOptions: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  replacementOptions: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Services = mongoose.model("services", ServiceSchmea, "services");

module.exports = Services;
