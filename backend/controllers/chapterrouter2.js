// routes/chapter.route.js
import express from "express";
const router = express.Router();
import chapterService from "../services/chapterServices2.js";
import ReadingProgress from "../models/readingProgress.js";
import SavedBook from "../models/savedBookModel.js"; // nhớ import đúng

// GET /api/chapters/:chapterId – Lấy chi tiết một chương + tự lưu tiến độ đọc
router.get("/:chapterId", async (req, res) => {
  try {
    const { chapterId } = req.params;
    const userId = req.user?._id; // Có middleware xác thực thì req.user sẽ có giá trị

    const chapter = await chapterService.getChapterById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    // Nếu có user đăng nhập thì:
    if (userId) {
      const { bookId, _id } = chapter;

      // Cập nhật tiến độ đọc
      //   await ReadingProgress.findOneAndUpdate(
      //     { userId, bookId },
      //     { lastReadChapterId: _id, updatedAt: new Date() },
      //     { upsert: true, new: true }
      //   );

      // Tự động thêm vào SavedBook nếu chưa có
      await SavedBook.findOneAndUpdate(
        { userId, bookId },
        { updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    res.json(chapter);
  } catch (error) {
    console.error("Error in GET /chapters/:chapterId:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
