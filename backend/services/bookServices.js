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

// 1.0.3: Được gọi từ bookroutes.js để lấy chi tiết truyện
const getBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    // 1.0.4: Truy vấn MongoDB Atlas (doctruyenDB, collection Books)
    const book = await Book.findOne({ "_id": bookId });
    // 1.0.5: MongoDB trả về dữ liệu truyện và danh sách chương
    if (book) {
      // 1.0.6: Trả dữ liệu về bookroutes.js
      // 1.0.7: bookroutes.js trả về res.status(200).json({book, chapters})
      console.log("Book fetched:", book); // Debug
      res.status(200).json({book: book, chapters: book.chapters });
    } else {
      // 1.1.5: Trả lỗi nếu không tìm thấy truyện
      // 1.1.6: Trả res.status(404).json({message: "Không tìm thấy truyện"})
      console.log("Book not found for bookId:", bookId); // Debug
      res.status(404).json({ message: "Không tìm thấy truyện" });
    }
  } catch (error) {
    // 1.1.5: Trả lỗi nếu truy vấn thất bại
    // 1.1.6: Trả res.status(404).json({message: "Không tìm thấy truyện"})
    console.error("Error fetching book:", error);
    res.status(404).json({ message: "Không tìm thấy truyện" });
  }
};

export { getBooks, getBook };