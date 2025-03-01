const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");
const { authorize } = require("../middlewares/auth");

router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers);
router.post(
  "/add-user",
  authenticate,
  authorize(["admin"]),
  userController.addUser
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
);
router.put(
  "/update-password",
  authenticate,
  authorize(["admin", "editor", "viewer"]),
  userController.updatePassword
);

module.exports = router;
