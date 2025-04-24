import { CustomError } from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new CustomError("Authentication failed", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new CustomError("Authentication failed", 401));
  }
};

export const admin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({message:"Access denied. Admin only."});
  }
};
