const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    price: {
      type: Number,
    },
    images: {
      type: Array,
    },
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
