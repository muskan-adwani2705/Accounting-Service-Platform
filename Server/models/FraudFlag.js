const mongoose = require("mongoose");

const fraudFlagSchema = new mongoose.Schema(
  {
    accountant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accountant"
    },
    reason: String,
    score: Number, // risk score
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model("FraudFlag", fraudFlagSchema);
