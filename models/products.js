const mongoose = require("mongoose");
const products = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  imgsrc1: {
    type: String,
    require: true,
  },
  rating: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  is_natural: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});

const Products = mongoose.model("products", products);
module.exports = Products;
