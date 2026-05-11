const SearchLog = require("../models/SearchLog");
const Accountant = require("../models/Accountant");
const Shortlist = require("../models/Shortlist");


exports.recommendAccountants = async (req, res) => {
  try {
    // Get recent SME searches
    const searches = await SearchLog.find({ sme: req.user.id })
      .sort({ timestamp: -1 })
      .limit(5);

    if (searches.length === 0) {
      return res.json([]);
    }

    const services = searches.map(s => s.service).filter(Boolean);
    const locations = searches.map(s => s.location).filter(Boolean);

    const accountants = await Accountant.find({
      isVerified: true,
      specialization: { $in: services },
      location: { $in: locations }
    }).populate("user", "name email");

    res.json(accountants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    // 1️⃣ Get shortlisted accountants
    const shortlist = await Shortlist.find({ sme: req.user.id })
      .populate("accountant");

    if (shortlist.length === 0) {
      return res.json([]);
    }

    // 2️⃣ Extract most common specialization
    const specializationCount = {};

    shortlist.forEach(item => {
      item.accountant.specialization.forEach(spec => {
        specializationCount[spec] =
          (specializationCount[spec] || 0) + 1;
      });
    });

    const topSpecialization = Object.keys(specializationCount)
      .sort((a, b) => specializationCount[b] - specializationCount[a])[0];

    // 3️⃣ Get shortlisted IDs
    const shortlistedIds = shortlist.map(item => item.accountant._id);

    // 4️⃣ Find similar accountants
    const recommendations = await Accountant.find({
      specialization: { $in: [topSpecialization] },
      _id: { $nin: shortlistedIds },
      isVerified: true
    }).populate("user", "name email");

    res.json(recommendations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};