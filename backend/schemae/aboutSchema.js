const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  about: {
    type: String,
  },
  aboutimage: {
    type: String,
  },
  giveaways: {
    type: String,
  },
  giveawayimage: {
    type: String,
  },
});

const About = mongoose.model("about", AboutSchema, "about");

module.exports = About;
