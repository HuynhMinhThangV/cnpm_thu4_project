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
    const book = await Book.findOne({ "chapters._id": chapterId });
    if (!book) {
      res.status(404).json({ message: "Không tìm thấy sách" });
    }
    const chapter = book.chapters.id(chapterId);
    if (!chapter) {
      res.status(404).json({ message: "Không tìm thấy chương" });
    }
    chapter.comments.push({ user, content });
    await book.save();
    res.status(200).json({ message: "Bình luận đã được thêm", chapter });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
export { getChapter, addComment };
