import Book from "../models/bookmodel.js";
import User from "../models/usermodel.js"; // Giả định model User

// 1.0.11: Được gọi từ chapterroutes.js để lấy nội dung chương
const getChapter = async (req, res) => {
  const chapterId = req.params.id;
  const userId = req.user?.id; // Giả định lấy từ middleware đăng nhập
  try {
    // 1.0.12: Truy vấn MongoDB Atlas (doctruyenDB, collection Books, trường chapters)
    const book = await Book.findOne({ "chapters._id": chapterId }, { "chapters.$": 1 });
    // 1.0.13: MongoDB trả về nội dung chương
    if (book && book.chapters.length > 0) {
      const chapter = book.chapters[0];
      // 1.0.14: Nếu độc giả đăng nhập, cập nhật trạng thái "đã đọc"
      if (userId) {
        try {
          // 1.0.15: MongoDB xác nhận cập nhật
          await User.updateOne(
            { "_id": userId },
            { $addToSet: { readChapters: chapterId } }
          );
          console.log("Marked chapter as read for user:", userId); // Debug
        } catch (error) {
          // 1.2.15: MongoDB trả về lỗi
          // 1.2.16: Tiếp tục trả nội dung chương
          console.error("Error marking chapter as read:", error); // Debug
        }
      }
      // 1.0.16: Trả nội dung chương về chapterroutes.js
      // 1.0.17: chapterroutes.js trả về res.status(200).json({content})
      console.log("Chapter fetched:", chapter); // Debug
      res.status(200).json({ content: chapter });
    } else {
      // 1.3.13: Trả lỗi nếu không tìm thấy chương
      // 1.3.14: Trả res.status(404).json({message: "Không tìm thấy chương"})
      console.log("Chapter not found for chapterId:", chapterId); // Debug
      res.status(404).json({ message: "Không tìm thấy chương" });
    }
  } catch (error) {
    // 1.3.13: Trả lỗi nếu truy vấn thất bại
    // 1.3.14: Trả res.status(404).json({message: "Không tìm thấy chương"})
    console.error("Error fetching chapter:", error); // Debug
    res.status(404).json({ message: "Không tìm thấy chương" });
  }
};

// 1.0.14: Đánh dấu chương đã đọc
const markChapterAsRead = async (req, res) => {
  const chapterId = req.params.id;
  const userId = req.user?.id;
  try {
    if (!userId) {
      throw new Error("Chưa đăng nhập");
    }
    // 1.0.12: Xác minh chương tồn tại
    const book = await Book.findOne({ "chapters._id": chapterId });
    if (!book || !book.chapters.id(chapterId)) {
      return res.status(404).json({ message: "Không tìm thấy chương" });
    }
    // 1.0.15: MongoDB xác nhận cập nhật
    const user = await User.updateOne(
      { "_id": userId },
      { $addToSet: { readChapters: chapterId } }
    );
    if (user.modifiedCount === 0) {
      throw new Error("Không thể cập nhật trạng thái đã đọc");
    }
    console.log("Marked chapter as read for user:", userId); // Debug
    res.status(200).json({ message: "Đã đánh dấu chương đã đọc" });
  } catch (error) {
    // 1.2.15: MongoDB trả về lỗi
    console.error("Error marking chapter as read:", error); // Debug
    res.status(500).json({ message: "Lỗi khi đánh dấu chương đã đọc" });
  }
};

export { getChapter, markChapterAsRead };