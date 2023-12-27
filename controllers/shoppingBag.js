const userProductsService = require("../services/userProducts");

async function shoppingBagPage(req, res) {
  const userid = req.query.id;
  try {
    const foundList = await userProductsService.getList(userid, "shoppingBag");
    if (!foundList) {
      await userProductsService.createUserProducts(userid, "shoppingBag");
    }
    var productsDetails = await userProductsService.fixProductsData(
      "shoppingBag",
      userid
    );
    res.json(productsDetails);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteProducts(req, res) {
  var productsDetails = [];
  const userid = req.body.userId;
  const productToDelete = req.body.productToDelete;
  try {
    await userProductsService.deleteProduct(
      userid,
      "shoppingBag",
      productToDelete
    );
    var productsDetails = await userProductsService.fixProductsData(
      "shoppingBag",
      userid
    );
    res.json(productsDetails);
  } catch (error) {
    res.status(500).send(error);
  }
}

// async function addOneProductToList(req, res) {
//   try {
//     const productId = req.body.productId;
//     await productService.deleteProduct(productId);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

async function decrementProductAmount(req, res) {
  const userid = req.body.userId;
  const productToUpdate = req.body.productToUpdate;
  const amount = req.body.amount;
  try {
    console.log(amount)
    console.log("jjjjj" + typeof amount);
    if (amount == 1) {
      await userProductsService.deleteProduct(
        userid,
        "shoppingBag",
        productToUpdate
      );
      var productsDetails = await userProductsService.fixProductsData(
        "shoppingBag",
        userid
      );
      res.send(productsDetails);
    } else {
      const updateList = await userProductsService.decrementProductAmount(
        userid,
        productToUpdate,
        "shoppingBag",
        amount
      );
      res.send(updateList);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function incrementProductAmount(req, res) {
  const userid = req.body.userId;
  const productToUpdate = req.body.productToUpdate;
  const amount = req.body.amount;
  try {
    const updateList = await userProductsService.incrementProductAmount(
      userid,
      productToUpdate,
      "shoppingBag",
      amount
    );
    res.send(updateList);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addOrder(req, res) {
  const userid = req.body.userId;
  try {
    await userProductsService.addorder(
      userid,
      req.body.client_name,
      req.body.total_price,
      req.body.credit_card_number,
      req.body.products
    );
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function clearBag(req, res) {
  const userid = req.query.id;
  try {
    await userProductsService.removeAllUserProducts(userid, "shoppingBag");
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getOrderProducts(req, res) {
  const userid = req.query.id;
  try {
    const products = await userProductsService.getProductsIdsAndAmounts(
      userid,
      "shoppingBag"
    );
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  shoppingBagPage,
  deleteProducts,
  addOrder,
  clearBag,
  getOrderProducts,
  decrementProductAmount,
  incrementProductAmount,
  // addOneProductToList,
};
