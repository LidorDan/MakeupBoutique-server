const express = require("express");
const ordersPageController = require("../controllers/ordersPage");
const router = express.Router();

router.get("/", ordersPageController.ordersPage);
router.get("/totalPriceLastYear", ordersPageController.totalPriceLastYear);


module.exports = router;
