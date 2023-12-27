const productService = require("../services/products");
const userProductsService = require("../services/userProducts");
async function productsPage(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function addProductToList(req, res) {
  const userid = req.body.userId; // in future will be = req.session.userId
  try {
    const productToAdd = req.body.productToAdd;
    const userProductsListType = req.body.userProductsListType;
    const foundList = await userProductsService.getList(
      userid,
      userProductsListType
    );
    if (!foundList) {
      await userProductsService.createUserProducts(
        userid,
        userProductsListType
      );
    }
    await userProductsService.addProductToList(
      userid,
      productToAdd,
      userProductsListType
    );
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addProduct(req, res) {
  try {
    const title = req.body.title;
    const brand = req.body.brand;
    const imgsrc1 = req.body.imgsrc1;
    const rating = req.body.rating;
    const price = req.body.price;
    const is_natural = req.body.is_natural;
    const category = req.body.category;
    const newProduct = await productService.addProduct(
      title,
      brand,
      imgsrc1,
      rating,
      price,
      is_natural,
      category
    );
    res.send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function editProduct(req, res) {
  try {
    const productId = req.body.productId;
    const title = req.body.title;
    const brand = req.body.brand;
    const imgsrc1 = req.body.imgsrc1;
    const rating = req.body.rating;
    const price = req.body.price;
    const is_natural = req.body.is_natural;
    const category = req.body.category;
    const newProduct = await productService.editProduct(
      productId,
      title,
      brand,
      imgsrc1,
      rating,
      price,
      is_natural,
      category
    );
    res.send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteProduct(req, res) {
  const productId = req.body.productId;
  try {
    const newProduct = await productService.deleteProduct(productId);
    res.send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  productsPage,
  addProductToList,
  addProduct,
  editProduct,
  deleteProduct,
};
