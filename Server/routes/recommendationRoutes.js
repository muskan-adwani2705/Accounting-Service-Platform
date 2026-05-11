const express = require("express");
const { recommendAccountants, getRecommendations} = require("../controllers/recommendationController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/search-based",
  protect,
  authorizeRoles("sme"),
  recommendAccountants
);
router.get("/", protect, authorizeRoles("sme"), getRecommendations);

module.exports = router;
