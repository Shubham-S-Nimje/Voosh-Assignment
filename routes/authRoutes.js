const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authenticate, authController.logout);

module.exports = router;
