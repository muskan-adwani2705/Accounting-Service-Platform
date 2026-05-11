const express = require("express");
const { detectFraud } = require("../controllers/fraudController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/detect",
  protect,
  authorizeRoles("admin"),
  detectFraud
);

module.exports = router;
