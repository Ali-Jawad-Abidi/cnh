const mongoose = require("mongoose");

const ImportantDatesSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isDate: {
    type: Boolean,
    required: true,
  },
});

const ImportantDates = mongoose.model("dates", ImportantDatesSchema, "dates");

module.exports = ImportantDates;
