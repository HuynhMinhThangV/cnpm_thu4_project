import express from "express";
import { getChapter, markChapterAsRead } from "../services/chapterServices.js";

const router = express.Router();

// 1.0.10: Nhận GET /api/chapters/:id từ ChapterDetail.jsx
router.route("/:id").get(getChapter);

// 1.0.14: Nhận POST /api/chapters/:id/mark-read để đánh dấu chương đã đọc
router.route("/:id/mark-read").post(markChapterAsRead);

export default router;