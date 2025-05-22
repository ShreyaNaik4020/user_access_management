const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
}

module.exports = { verifyToken, isAdmin };