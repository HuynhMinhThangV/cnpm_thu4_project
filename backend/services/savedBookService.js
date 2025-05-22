// controllers/savedBookController.js
import SavedBook from "../models/SaveBook.js";

export const saveOrUpdateBookProgress = async (req, res) => {
  const { userId, bookId, chapterId } = req.body;

  try {
    let saved = await SavedBook.findOne({ userId, bookId });

    if (saved) {
      saved.lastReadChapterId = chapterId;
      saved.lastReadAt = new Date();
    } else {
      saved = new SavedBook({ userId, bookId, lastReadChapterId: chapterId });
    }

    await saved.save();
    res.status(200).json({ message: "Tiến độ đã được lưu", saved });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

export const getSavedBooksByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const savedBooks = await SavedBook.find({ userId })
      .populate("bookId", "title images") // lấy tên và ảnh truyện
      .populate("lastReadChapterId", "title order") // lấy tên chương
      .sort({ lastReadAt: -1 });

    res.status(200).json(savedBooks);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy tủ truyện" });
  }
};
