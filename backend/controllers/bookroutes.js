import express from "express";
import { getBook, getBooks, searchBook } from "../services/bookServices.js";
const router = express.Router();

// Nhận GET /api/books để lấy danh sách truyện
router.route("/").get(getBooks);

// 2.1.4: BookController nhận yêu cầu tìm kiếm từ ApiService
router.route("/search").get(async (req, res) => {
  // 2.1.5: Gọi BookService.findBook(criteria)
  const criteria = {
    title: req.query.title,
    author: req.query.author,
    genres: req.query.genres ? req.query.genres.split(",") : undefined,
    keyword: req.query.keyword,
  };
  try {
    const books = await searchBook(criteria);
    if (!books || books.length === 0) {
      // 2.2.17: Không tìm thấy truyện, trả về "No book found"
      return res.status(404).json({ message: "No book found" });
    }
    // 2.1.11: Trả về danh sách truyện
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/:id").get(getBook);

export default router;