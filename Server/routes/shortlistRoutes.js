const express = require("express");
const {
  addToShortlist,
  getShortlist,
  removeFromShortlist
} = require("../controllers/shortlistController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();


// SME only routes
router.post("/", protect, authorizeRoles("sme"), addToShortlist);

router.get("/", protect, authorizeRoles("sme"), getShortlist);

router.delete("/:accountantId", protect, authorizeRoles("sme"), removeFromShortlist);

module.exports = router;