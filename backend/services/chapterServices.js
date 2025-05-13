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
  const { chapterId, content, user } = req.body;
  try {
    if (!chapterId || !content || !user) {
      return res
        .status(400)
        .json({ message: "Dữ liệu bình luận không hợp lệ." });
    }
    //4.1.4. Lấy ra truyện/sách có chương có id tương ứng với id nhận được từ request
    const book = await Book.findOne({ "chapters._id": chapterId });
    if (!book) {
      //4.1.4.1. Kiểm tra nếu không lấy ra được sách/truyện với id chương truyện tương ứng,
      // đặt status code là 404 và trả về json với thông diệp là Không tìm thấy sách.
      res.status(404).json({ message: "Không tìm thấy sách" });
    }
    //4.1.5. Lấy ra chương truyện/sách có id trùng với id nhận được từ request.
    const chapter = book.chapters.id(chapterId);
    if (!chapter) {
      //4.1.5.1. Kiểm tra nếu không lấy ra được chương sách/truyện với id chương truyện tương ứng,
      // đặt status code là 404 và trả về json với thông diệp là Không tìm thấy chương truyện.
      res.status(404).json({ message: "Không tìm thấy chương" });
    }
    //4.1.6. Tạo 1 bình luận mới bằng cách truyền vào mảng chương truyện/sách 1 đối tượng
    // gồm username và nội dung vào mảng chương truyện/sách.
    chapter.comments.push({ user, content });
    //4.1.7. Lưu vào cơ sở dữ liệu.
    await book.save();
    //4.1.8. Đặt status code là 200 và trả về frontend một json với thông diệp là bình luận đã được thêm
    //  và một mảng chương truyện/sách vừa được thêm bình luận vào.
    res.status(200).json({ message: "Bình luận đã được thêm", chapter });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
export { getChapter, addComment };
