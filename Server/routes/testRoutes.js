const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

// Only ADMIN
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// Only SME
router.get("/sme", protect, authorizeRoles("sme"), (req, res) => {
  res.json({ message: "Welcome SME" });
});

// Only ACCOUNTANT
router.get("/accountant", protect, authorizeRoles("accountant"), (req, res) => {
  res.json({ message: "Welcome Accountant" });
});

module.exports = router;
