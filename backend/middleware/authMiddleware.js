import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      if (decoded.role === "student") {
        req.user = await Student.findById(decoded.id).select("-password");
      } else {
        req.user = await Faculty.findById(decoded.id).select("-password");
      }

      // If user doesn't exist anymore, but token is valid
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      // Attach the role explicitly just in case it's needed in req.user
      // (For faculty it might already be there from DB, but for student it's implicit)
      req.user.role = decoded.role;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
    }
    next();
  };
};

export { protect, authorizeRoles };
