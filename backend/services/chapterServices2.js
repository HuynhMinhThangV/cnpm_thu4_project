// services/chapter.service.js
import Chapter from "../models/chapterModel.js";

const getChaptersByBookId = async (bookId) => {
  return await Chapter.find({ bookId })
    .sort({ order: 1 })
    .select("_id title order createdAt")
    .lean();
};

const getLatestChaptersByBookId = async (bookId, limit = 3) => {
  return await Chapter.find({ bookId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("_id title order createdAt")
    .lean();
};

const getChapterById = async (chapterId) => {
  return await Chapter.findById(chapterId)
    .select("_id title content order createdAt bookId")
    .lean();
};

// Thêm các chức năng khác nếu cần: createChapter, updateChapter, deleteChapter

export default {
  getChaptersByBookId,
  getLatestChaptersByBookId,
  getChapterById,
};
