const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization); // 👈 ADD HERE

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token); // 👈 ADD THIS ALSO

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded); // 👈 OPTIONAL but useful

      req.user = decoded;
      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message); // 👈 VERY IMPORTANT
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied for this role"
      });
    }
    next();
  };
};
