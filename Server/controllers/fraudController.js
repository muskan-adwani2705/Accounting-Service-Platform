const Accountant = require("../models/Accountant");
const FraudFlag = require("../models/FraudFlag");

exports.detectFraud = async (req, res) => {
  try {
    const accountants = await Accountant.find();

    let flagged = [];

    for (let acc of accountants) {
      let score = 0;
      let reasons = [];

      // Rule 1: Incomplete profile
      if (!acc.description) {
        score += 30;
        reasons.push("Incomplete profile");
      }

      // Rule 2: Very low experience
      if (acc.experience < 1) {
        score += 20;
        reasons.push("Very low experience");
      }

      // Rule 3: No specialization
      if (!acc.specialization || acc.specialization.length === 0) {
        score += 40;
        reasons.push("No specialization");
      }

      if (score >= 50) {
        const flag = await FraudFlag.create({
          accountant: acc._id,
          reason: reasons.join(", "),
          score
        });

        flagged.push(flag);
      }
    }

    res.json({
      message: "Fraud detection completed",
      flaggedCount: flagged.length
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
