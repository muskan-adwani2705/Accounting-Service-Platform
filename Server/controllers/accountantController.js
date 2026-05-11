const Accountant = require("../models/Accountant");
const SearchLog = require("../models/SearchLog");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// CREATE PROFILE
exports.createProfile = async (req, res) => {
  try {
    const { specialization, experience, location, description } = req.body;

    // Validation
    if (!specialization || !experience || !location) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    // Create profile
    const profile = await Accountant.create({
      user: null,
      specialization,
      experience,
      location,
      description,
      isVerified: true // auto verified for demo
    });

    res.status(201).json({
      message: "Accountant profile created",
      profile
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL ACCOUNTANTS
exports.getAllAccountants = async (req, res) => {
  try {
    const accountants = await Accountant.find({});

    res.json(accountants);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ACCOUNTANT BY ID
exports.getAccountantById = async (req, res) => {
  try {
    const accountant = await Accountant.findById(req.params.id);

    if (!accountant) {
      return res.status(404).json({
        message: "Accountant not found"
      });
    }

    res.json(accountant);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// SEARCH ACCOUNTANTS
exports.searchAccountants = async (req, res) => {
  try {
    const { service, location, minExperience } = req.query;

    let query = {};

    // Service filter
    if (service) {
      query.specialization = { $in: [service] };
    }

    // Location filter
    if (location) {
      query.location = location;
    }

    // Experience filter
    if (minExperience) {
      query.experience = {
        $gte: Number(minExperience)
      };
    }

    const accountants = await Accountant.find(query);

    res.json(accountants);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ADMIN - GET UNVERIFIED
exports.getUnverifiedAccountants = async (req, res) => {
  try {
    const accountants = await Accountant.find({
      isVerified: false
    });

    res.json(accountants);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ADMIN - VERIFY
exports.verifyAccountant = async (req, res) => {
  try {
    const accountant = await Accountant.findById(req.params.id);

    if (!accountant) {
      return res.status(404).json({
        message: "Accountant not found"
      });
    }

    accountant.isVerified = true;

    await accountant.save();

    res.json({
      message: "Accountant verified successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};