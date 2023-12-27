const Product = require("../models/products");

async function getProduct(productId) {
  const product = await Product.findOne({ _id: productId });
  return product;
}
async function getAllProducts() {
  const product = await Product.find({});
  return product;
}
async function isProductExsist(productid) {
  const product = await Product.find({ _id: productid });
  if (product) return true;
  return false;
}

async function getFilteredProducts(productId) {
  const product = await Product.find({ _id: productId });
  return product;
}

async function addProduct(
  title,
  brand,
  imgsrc1,
  rating,
  price,
  is_natural,
  category
) {
  const product = new Product({
    title: title,
    brand: brand,
    imgsrc1: imgsrc1,
    rating: rating,
    price: price,
    is_natural: is_natural,
    category: category,
  });
  await product.save();
  const updateList = await getAllProducts();
  return updateList;
}

async function editProduct(
  productId,
  title,
  brand,
  imgsrc1,
  rating,
  price,
  is_natural,
  category
) {
  await Product.findByIdAndUpdate(
    { _id: productId },
    { title, brand, imgsrc1, rating, price, is_natural, category }
  );
  const updateList = await getAllProducts();
  return updateList;
}
async function deleteProduct(productId) {
  await Product.findOneAndDelete({ _id: productId });
  const updateList = await getAllProducts();
  return updateList;
}
module.exports = {
  getProduct,
  getAllProducts,
  isProductExsist,
  getFilteredProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
