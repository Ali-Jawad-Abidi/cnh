const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
  },
  image: {
    type: String,
    required: true,
  },
  consoles: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  brand: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const SubCategories = mongoose.model(
  "subcategories",
  SubCategorySchema,
  "subcategories"
);

module.exports = SubCategories;
