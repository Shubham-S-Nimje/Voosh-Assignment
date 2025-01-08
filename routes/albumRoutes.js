const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");
const { authenticate } = require("../middlewares/auth");
const { authorize } = require("../middlewares/auth");

router.get("/", authenticate, albumController.getAllAlbums);
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  albumController.getAlbumById
);
router.post(
  "/add-album",
  authenticate,
  authorize(["admin"]),
  albumController.addAlbum
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  albumController.updateAlbum
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  albumController.deleteAlbum
);

module.exports = router;
