// middleware/auth.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Get token from "Bearer <token>"

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = decoded;

    next(); // Proceed to the next middleware or route
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
