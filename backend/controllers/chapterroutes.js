import express from "express";
import { addComment, getChapter } from "../services/chapterServices.js";

const router = express.Router();

// 4.1.4: Backend (chapterroutes.js) nhận request POST tại route /api/chapters/:id và
// gọi hàm addComment trong package services (chapterServices.js).
// 1.0.10: Nhận GET /api/chapters/:chapterId từ ChapterDetail.jsx
// 1.0.15: Trả về res.status(200).json(chapter) nếu thành công
// 1.2.14: Trả res.status(404).json({message: "Không tìm thấy chương"}) nếu lỗi
router.route("/:id").get(getChapter).post(addComment);

export default router;