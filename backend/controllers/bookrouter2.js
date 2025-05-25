// routes/book.route.js
import express from "express";
const router = express.Router();
import getBookDetail from "../services/bookServices2.js"; // Sửa đường dẫn nếu cần
import Book from "../models/booksModel.js"; // Sửa đường dẫn nếu cần
import authMiddleware from "../middlewares/authMiddleware.js";

// GET /api/books/:bookId
router.get("/:bookId", authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user ? req.user._id : null; // nếu bạn đã dùng JWT/middleware xác thực
    const data = await getBookDetail(bookId, userId);
    res.json(data);
  } catch (error) {
    console.error("Error in /books/:bookId:", error);
    res.status(500).json({ message: error.message || "Lỗi máy chủ" });
  }
});
router.get("/", async (req, res) => {
  try {
    // Lọc sách có trạng thái Published
    const books = await Book.find({})
      .select("title author images status") // lấy tất cả sách, có thể thêm các trường khác nếu cần
      .lean();

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Lỗi server khi lấy sách" });
  }
});

export default router;
