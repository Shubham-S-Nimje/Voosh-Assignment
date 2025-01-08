const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", authenticate, artistController.getAllArtists);
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  artistController.getArtistById
);
router.post(
  "/add-artist",
  authenticate,
  authorize(["admin"]),
  artistController.addArtist
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  artistController.updateArtist
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  artistController.deleteArtist
);

module.exports = router;
