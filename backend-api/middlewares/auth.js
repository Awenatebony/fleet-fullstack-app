const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const headerBearer = req.header("Authorization");

  if (!headerBearer || !headerBearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token format" });
  }

  const token = headerBearer.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
