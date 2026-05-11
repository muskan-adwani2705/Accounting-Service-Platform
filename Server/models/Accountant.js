const mongoose = require("mongoose");

const accountantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    specialization: {
      type: [String], // ["GST", "Audit", "IT Returns"]
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: String,
    rating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false // admin verifies later
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Accountant", accountantSchema);
