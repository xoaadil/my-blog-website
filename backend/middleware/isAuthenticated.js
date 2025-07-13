const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = async (req, res, next) => {
  console.log("🔐 Checking authentication...");

  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "❌ Token not provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.id; // attach userId for use in controller
    next();
  } catch (err) {
    console.error("❌ Invalid or expired token:", err.message);
    return res.status(401).json({ message: "❌ Invalid token" });
  }
};

module.exports = isAuthenticated;
