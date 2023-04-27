const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("category", CategorySchema);
