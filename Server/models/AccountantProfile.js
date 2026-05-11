const mongoose = require("mongoose");

const accountantProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    services: [String], // GST, ITR, Bookkeeping
    experience: Number,
    rating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AccountantProfile",
  accountantProfileSchema
);
