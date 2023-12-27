const express = require("express");
const storesPageController = require("../controllers/storesPage");
const router = express.Router();

router.get("/", storesPageController.storesPage);
router.post("/deleteStore", storesPageController.deleteStore);
router.post("/updateStorePhone", storesPageController.updateStorePhone);
router.post("/addStore", storesPageController.addStore);


module.exports = router;