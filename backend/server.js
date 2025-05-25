import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookroutes from "./controllers/bookroutes.js";
import bookrouter2 from "./controllers/bookrouter2.js"; // Import bookrouter2
import chapterroutes from "./controllers/chapterroutes.js";
import chapterroutes2 from "./controllers/chapterrouter2.js"; // Import chapterroutes2
import savedroutes from "./controllers/savedroutes.js";
import cookieParser from "cookie-parser";
import userrouter from "./controllers/userrouter.js";
import User from "./models/userModel.js"; // Import model User

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Địa chỉ frontend React
    credentials: true, // Cho phép gửi cookie/session
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Middleware xác thực đơn giản dựa trên cookie
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

// API đăng nhập đơn giản
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Thiếu email hoặc password" });
  }
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
  }
  // Set cookie đơn giản, không bảo mật
  res.cookie("email", email, {
    httpOnly: false, // Có thể set true nếu bạn muốn
    maxAge: 24 * 60 * 60 * 1000, // 1 ngày
  });
  return res.json({ message: "Đăng nhập thành công" });
});

// app.use("/api/books", bookroutes);
app.use("/api/books", bookrouter2);
//4.1.4.File server.js(backend/server.js) đăng ký route /api/chapter xử lý các logic liên quan đến chapter
// app.use("/api/chapters", chapterroutes);
app.use("/api/chapters", chapterroutes2); // Thêm middleware xác thực
app.use("/api/savedbooks", savedroutes);
app.use("/api", userrouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
