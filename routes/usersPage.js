const express = require("express");
const userssPageController = require("../controllers/usersPage");
const router = express.Router();

router.get("/", userssPageController.usersPage);
router.post("/deleteUser", userssPageController.deleteUser);
router.post("/updateUserEmail", userssPageController.updateUserEmail);
router.post("/addUser", userssPageController.addUser);
router.post("/getUserByEmail", userssPageController.getUserByEmail);
router.post("/getUserById", userssPageController.getUserById);




module.exports = router;