// backend/server.js (hoặc file route)
import express from "express";
import { login } from "../services/userService.js"; // Đường dẫn tùy thuộc vào cấu trúc dự án

const router = express.Router();

router.post("/login", login);

export default router;
