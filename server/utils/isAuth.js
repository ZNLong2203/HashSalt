const User = require("../models/users.model");
const KeyToken = require("../models/keytoken.model");
const jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
  // Get access token from request headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  // Verify access token
  jwt.verify(token, process.env.JWT_PUBLIC_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Access token expired" });
      } else {
        return res.status(403).json({ message: "Invalid access token" });
      }
    }
    req.user = user;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Access denied" });
  }
  next();
};
