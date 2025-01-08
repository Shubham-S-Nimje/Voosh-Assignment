const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { authenticate } = require("../middlewares/auth");
const { authorize } = require("../middlewares/auth");

router.get(
  "/:category",
  authenticate,
  favoriteController.getFavoritesByCategory
);
router.post(
  "/add-favorite",
  authenticate,
  authorize(["admin"]),
  favoriteController.addFavorite
);
router.delete(
  "/remove-favorite/:id",
  authenticate,
  authorize(["admin"]),
  favoriteController.removeFavorite
);

module.exports = router;
