import Book from "../models/bookmodel.js";

// Được gọi từ bookroutes.js để lấy danh sách truyện
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    console.log("Books fetched:", books); // Debug
    res.status(200).json(books);
  } catch (error) {
    // 1.1.5: Trả lỗi nếu truy vấn thất bại
    // 1.1.6: Trả res.status(404).json({message: "Không tìm thấy truyện"})
    console.error("Error fetching books:", error);
    res.status(404).json({ message: "Không tìm thấy truyện" });
  }
};

const getBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    // 1.0.3: bookroutes.js gọi book-services.js (await Book.findOne({"_id": bookId}))
    const book = await Book.findOne({ "_id": bookId });
    // 1.0.4: Truy vấn MongoDB Atlas (doctruyendb, collection Books)
    // 1.0.5: MongoDB trả về dữ liệu truyện và danh sách chương
    if (book) {
      // 1.0.6: Trả dữ liệu về bookroutes.js
      // 1.0.7: bookroutes.js trả về res.status(200).json({book, chapters})
      res.status(200).json({book: book, chapters: book.chapters });
    } else {
      // 1.1.6: Trả res.status(404).json({message: "Không tìm thấy truyện"})
      res.status(404).json({ message: "Không tìm thấy truyện" });
    }
  } catch (error) {
    res.status(404).json({ message: "Không tìm thấy truyện" });
  }
};

// 2.1.5: BookService nhận yêu cầu tìm kiếm từ BookRoutes
const searchBook = async (criteria) => {
  // 2.1.6: BookService gọi BookModel để truy vấn
  // criteria: { title, author, genres, keyword }
  const query = {};
  if (criteria.title) query.title = { $regex: criteria.title, $options: "i" };
  if (criteria.author) query.author = { $regex: criteria.author, $options: "i" };
  if (criteria.genres) query["genres.name"] = { $in: criteria.genres };
  if (criteria.keyword) {
    query.$or = [
      { title: { $regex: criteria.keyword, $options: "i" } },
      { author: { $regex: criteria.keyword, $options: "i" } },
      { description: { $regex: criteria.keyword, $options: "i" } },
    ];
  }
  // 2.1.7: BookModel gửi yêu cầu executeQuery(criteria) đến MongoDB
  const books = await Book.find(query);
  // 2.1.10/2.2.10: BookService trả kết quả cho BookRoutes
  return books;
};

export { getBooks, getBook, searchBook };