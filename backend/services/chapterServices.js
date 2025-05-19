import Book from "../models/bookmodel.js";

const getChapter = async (req, res) => {
  const chapterId = req.params.id;
  try {
    const book = await Book.findOne({ "chapters._id": chapterId });
    if (!book) {
      res.status(404).json({ message: "Không tìm thấy chapter" });
    }
    const chapter = book.chapters.id(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Không tìm thấy chương." });
    }

    return res.json(chapter);
  } catch (error) {
    console.error("Lỗi khi truy vấn chapter:", error);
    return res.status(500).json({ message: "Lỗi server." });
  }
};
const addComment = async (req, res) => {
  //4.1.5 Lấy chapterId,content,user từ request
  const { chapterId, content, user } = req.body;
  try {
    // 4.1.6 Kiểm tra dữ liệu đầu vào (user,chapterId,content) hợp lệ.
    if (!chapterId || !content || !user) {
      return res
        .status(400)
        .json({ message: "Dữ liệu bình luận không hợp lệ." });
    }
    // 4.1.7.	Truy vấn Book trong database để tìm sách/truyện có id chương truyện trong đó
    // trùng với id chương truyện nhận được từ request.
    const book = await Book.findOne({ "chapters._id": chapterId });

    //4.3.1 Truy vấn không có sách/truyện nào chứa chương có chapterId trùng với yêu cầu
    if (!book) {
      //4.3.2. Server phản hồi với mã lỗi 404 và thông điệp "Không tìm thấy sách"
      res.status(404).json({ message: "Không tìm thấy sách" });
    }
    //4.1.8. Lấy ra chương truyện/sách có id tương ứng trong truyện/sách vừa truy vấn được.
    const chapter = book.chapters.id(chapterId);
    // 4.1.9.	Thêm 1 bình luận {user,content} vào mảng chapter.comments.
    chapter.comments.push({ user, content });
    // 4.1.10. Lưu lại vào database (book.save()).
    await book.save();
    //4.1.11 .Trả về phản hồi 200 kèm chương đã được cập nhật bình luận.
    res.status(200).json({ message: "Bình luận đã được thêm", chapter });

    //8.1. Ngoại lệ xảy ra khi xử lý logic trong addComment(chapterServices.js)
  } catch (error) {
    //8.1.1 In ra console để người phát triển debug.
    console.log(error);
    //8.1.2 Trả về mã lỗi 500 với thông diệp lỗi server.
    res.status(500).json({ message: "Lỗi server" });
  }
};
export { getChapter, addComment };
