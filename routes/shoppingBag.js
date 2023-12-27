const express = require("express");
const shoppingBagController = require("../controllers/shoppingBag");
const router = express.Router();

router.get("/", shoppingBagController.shoppingBagPage);
router.post("/delete", shoppingBagController.deleteProducts);
router.post(
  "/decrementProductAmount",
  shoppingBagController.decrementProductAmount
);
router.post(
  "/incrementProductAmount",
  shoppingBagController.incrementProductAmount
);
router.post("/addOrder", shoppingBagController.addOrder);
router.get("/orderProducts", shoppingBagController.getOrderProducts);
router.get("/clearBag", shoppingBagController.clearBag);
module.exports = router;
