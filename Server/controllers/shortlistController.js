const Shortlist = require("../models/Shortlist");


// ➤ Add to shortlist
exports.addToShortlist = async (req, res) => {
  try {
    const { accountantId } = req.body;

    const exists = await Shortlist.findOne({
      sme: req.user.id,
      accountant: accountantId
    });

    if (exists) {
      return res.status(400).json({ message: "Already shortlisted" });
    }

    const item = await Shortlist.create({
      sme: req.user.id,
      accountant: accountantId
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ➤ Get SME shortlist
exports.getShortlist = async (req, res) => {
  try {
    const list = await Shortlist.find({ sme: req.user.id })
      .populate({
        path: "accountant",
        populate: { path: "user", select: "name email" }
      });

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ➤ Remove from shortlist
exports.removeFromShortlist = async (req, res) => {
  try {
    await Shortlist.findOneAndDelete({
      sme: req.user.id,
      accountant: req.params.accountantId
    });

    res.json({ message: "Removed from shortlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};