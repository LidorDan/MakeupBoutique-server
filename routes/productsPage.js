const express = require("express");
const productsPageController = require("../controllers/productsPage");
const router = express.Router();

router.get("/", productsPageController.productsPage);
router.post("/addProductToList", productsPageController.addProductToList);
router.post("/addProduct", productsPageController.addProduct);
router.post("/editProduct", productsPageController.editProduct);
router.post("/deleteProduct", productsPageController.deleteProduct);

module.exports = router;
