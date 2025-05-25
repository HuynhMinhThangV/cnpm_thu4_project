// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Đường dẫn tùy thuộc vào cấu trúc dự án

const authMiddleware = async (req, res, next) => {
  const { email } = req.cookies;
  if (!email) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User không tồn tại" });
  }
  req.user = user;
  next();
};

export const verifyUser = (req, res, next) => {
  // logic kiểm tra người dùng đăng nhập
  if (!req.user) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  next();
};

export default authMiddleware;
