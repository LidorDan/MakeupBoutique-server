const express = require("express");
const wishListController = require("../controllers/wishList");
const router = express.Router();

router.get("/", wishListController.wishListPage);
router.post("/delete", wishListController.deleteProducts);
module.exports = router;
