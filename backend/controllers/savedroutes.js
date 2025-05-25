import express from "express";
import SavedService from "../services/savedService.js";
import e from "express";
import authMiddleware, { verifyUser } from "../middlewares/authMiddleware.js";
import SavedBook from "../models/savedBookModel.js"; // Đường dẫn tùy thuộc vào cấu trúc dự án
import mongoose from "mongoose"; // Đảm bảo đã cài mongoose

const savedService = new SavedService();

const router = express.Router();
router.use(authMiddleware);

// router.post("/bookmark/:bookId", async (req, res) => {
//   try {
//     const saved = await savedService.saveBook(req.user._id, req.params.bookId);
//     res.json(saved);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/bookmark", authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.body;

    const saved = await SavedService.saveFromBookmark(req.user._id, bookId);

    res.json(saved);
  } catch (error) {
    console.error("Lỗi khi bookmark:", error);
    res.status(500).json({ error: "Lỗi server khi đánh dấu bookmark." });
  }
});

router.post("/last-read", async (req, res) => {
  try {
    const { bookId, chapterId } = req.body;
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }
    if (!bookId || !chapterId) {
      return res.status(400).json({ message: "Thiếu bookId hoặc chapterId" });
    }
    const saved = await SavedService.saveFromReading(userId, bookId, chapterId);
    res.status(200).json(saved);
  } catch (error) {
    console.error("Lỗi trong /last-read:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

router.post("/remove-bookmark/:bookId", async (req, res) => {
  try {
    const saved = await savedService.removeBookmark(
      req.user._id,
      req.params.bookId
    );
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const savedBooks = await savedService.getSavedBooks(req.user._id);
    res.json(savedBooks);
  } catch (error) {
    console.error("Lỗi khi lấy sách đã lưu:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/savedbooks/:bookId
router.delete("/:savedBookId", verifyUser, async (req, res) => {
  try {
    const savedBookId = req.params.savedBookId;
    const deleted = await SavedBook.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(savedBookId),
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy sách đã lưu" });
    }

    res.json({ message: "Đã xóa khỏi tủ truyện" });
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
