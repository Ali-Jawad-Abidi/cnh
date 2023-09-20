const mongoose = require("mongoose");

const ServiceSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Services = mongoose.model("services", ServiceSchmea, "services");

module.exports = Services;
