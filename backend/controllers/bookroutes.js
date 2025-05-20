import express from "express";
import { getBook, getBooks } from "../services/bookServices.js";
const router = express.Router();

// Nhận GET /api/books để lấy danh sách truyện
router.route("/").get(getBooks);

// 1.0.2: Nhận GET /api/books/:id từ HomePage.jsx
router.route("/:id").get(getBook);

export default router;