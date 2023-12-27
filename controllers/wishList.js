const userProductsService = require("../services/userProducts");
async function wishListPage(req, res) {
  const userid = req.query.id;
  try {
    const foundList = await userProductsService.getList(userid, "wishList");
    if (!foundList) {
      await userProductsService.createUserProducts(userid, "wishList");
    }
    var productsDetails = await userProductsService.fixProductsData(
      "wishList",
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
      "wishList",
      productToDelete
    );
    var productsDetails = await userProductsService.fixProductsData(
      "wishList",
      userid
    );
    res.json(productsDetails);
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = { wishListPage, deleteProducts };
