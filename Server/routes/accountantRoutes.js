const express = require("express");

const {
  createProfile,
  getAllAccountants,
  getAccountantById,
  searchAccountants,
  getUnverifiedAccountants,
  verifyAccountant
} = require("../controllers/accountantController");

const router = express.Router();

// SEARCH
router.get("/search", searchAccountants);

// CREATE PROFILE
router.post("/profile", createProfile);

// GET ALL
router.get("/", getAllAccountants);

// GET BY ID
router.get("/:id", getAccountantById);

// ADMIN
router.get("/admin/unverified", getUnverifiedAccountants);

router.put("/admin/verify/:id", verifyAccountant);

module.exports = router;