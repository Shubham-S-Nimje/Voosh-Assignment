const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const { authenticate } = require("../middlewares/auth");
const { authorize } = require("../middlewares/auth");

router.get("/", authenticate, trackController.getAllTracks);
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  trackController.getTrackById
);
router.post(
  "/add-track",
  authenticate,
  authorize(["admin"]),
  trackController.addTrack
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  trackController.updateTrack
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  trackController.deleteTrack
);
module.exports = router;
