const mongoose = require("mongoose");

const shortlistSchema = new mongoose.Schema({
  sme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  accountant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accountant",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Shortlist", shortlistSchema);