const mongoose = require("mongoose");

const searchLogSchema = new mongoose.Schema(
  {
    sme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    service: String,
    location: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model("SearchLog", searchLogSchema);
