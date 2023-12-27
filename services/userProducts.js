const UserProducts = require("../models/userProducts");
const productService = require("./products");

const Orders = require("../models/orders");
var ObjectId = require("mongoose").Types.ObjectId;

async function getList(userid, userProductsType) {
  const userProducts = await UserProducts.findOne({
    userid: userid,
    userProductsType: userProductsType,
  });
  return userProducts;
}
async function createUserProducts(userid, userProductsType) {
  const userProducts = new UserProducts({
    userid: userid,
    userProductsType: userProductsType,
    products: [],
  });
  await userProducts.save();
}
async function getProductsIdsAndAmounts(userid, userProductsType) {
  const products = await UserProducts.findOne({
    userid: userid,
    userProductsType: userProductsType,
  }).select("-_id products");
  return products.products;
}

async function findProductInList(userid, productid, userProductsType) {
  const userProducts = await UserProducts.findOne({
    userid: userid,
    userProductsType: userProductsType,
  }).select("-_id products");
  const products = userProducts["products"];
  for (let i = 0; i < products.length; i++) {
    if (productid == products[i]._id) return true;
  }
  return false;
}

async function addProductToList(userid, productid, userProductsType) {
  const isProductExsist = await productService.isProductExsist(productid);
  if (isProductExsist) {
    const foundProductInList = await findProductInList(
      userid,
      productid,
      userProductsType
    );
    if (!foundProductInList) {
      await UserProducts.updateOne(
        { userid: userid, userProductsType },
        { $push: { products: { _id: productid, amount: 1 } } }
      );
    } else {
      await UserProducts.updateOne(
        { userid: userid, userProductsType, "products._id": productid },
        { $inc: { "products.$.amount": 1 } }
      );
    }
  }
}

async function decrementProductAmount(
  userid,
  productToUpdate,
  userProductsType,
  amount
) {
  await UserProducts.updateOne(
    {
      userid: userid,
      userProductsType: userProductsType,
      "products._id": productToUpdate,
    },
    { $inc: { "products.$.amount": -1 } }
  );
  const updateList = await fixProductsData(userProductsType, userid);
  return updateList;
}

async function incrementProductAmount(
  userid,
  productToUpdate,
  userProductsType,
  amount
) {
  await UserProducts.updateOne(
    {
      userid: userid,
      userProductsType: userProductsType,
      "products._id": productToUpdate,
    },
    { $inc: { "products.$.amount": 1 } }
  );
  const updateList = await fixProductsData(userProductsType, userid);
  return updateList;
}

// !! add check if shopping bag or wish list
async function removeAllUserProducts(userid, userProductsType) {
  const userProducts = await UserProducts.deleteMany({
    userid: userid,
    userProductsType: userProductsType,
  });
  return;
}
async function deleteProduct(userid, userProductsType, productid) {
  var currentProducts = await getProductsIdsAndAmounts(
    userid,
    userProductsType
  );
  for (let i = 0; i < currentProducts.length; i++) {
    if (currentProducts[i]._id.toString() == productid) {
      currentProducts.splice(i, 1);
      break;
    }
  }
  await UserProducts.updateOne(
    { userid, userProductsType },
    {
      $set: {
        products: currentProducts,
      },
    }
  );
}

async function addorder(
  userId,
  client_name,
  total_price,
  credit_card_number,
  products
) {
  // console.log(products);
  // const products = await getList(userId, "shoppingBag");
  const order = new Orders({
    userId: userId,
    client_name: client_name,
    totalPrice: total_price,
    credit_card_number: credit_card_number,
    items: products,
  });
  await order.save();
}
async function fixProductsData(userProductsType, userid) {
  var productsDetails = [];
  const products = await getProductsIdsAndAmounts(userid, userProductsType);
  var productDetails;

  for (const index in products) {
    var productDetailsPlusAmount = {
      _id: "",
      title: "",
      brand: "",
      imgsrc1: "",
      rating: "",
      price: "",
      is_natural: false,
      category: "",
      amount: 0,
    };
    productDetails = await productService.getProduct(products[index]._id);
    if (productDetails) {
      productDetailsPlusAmount._id = productDetails._id.toString();
      productDetailsPlusAmount.title = productDetails.title;
      productDetailsPlusAmount.brand = productDetails.brand;
      productDetailsPlusAmount.imgsrc1 = productDetails.imgsrc1;
      productDetailsPlusAmount.rating = productDetails.rating;
      productDetailsPlusAmount.price = productDetails.price;
      productDetailsPlusAmount.is_natural = productDetails.is_natural;
      productDetailsPlusAmount.category = productDetails.category;
      productDetailsPlusAmount.amount = products[index].amount;
      productsDetails.push(productDetailsPlusAmount);
    }
  }
  return productsDetails;
}

module.exports = {
  getList,
  createUserProducts,
  getProductsIdsAndAmounts,
  findProductInList,
  addProductToList,
  removeAllUserProducts,
  deleteProduct,
  addorder,
  fixProductsData,
  decrementProductAmount,
  incrementProductAmount,
};
