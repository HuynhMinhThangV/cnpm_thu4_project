import SavedBook from "../models/savedBookModel.js";
import chapterModel from "../models/chapterModel.js";
import User from "../models/userModel.js";
class SavedService {
  async getSavedBooks(userId) {
    try {
      const savedBooks = await SavedBook.find({ userId })
        .populate("bookId", "title author images")
        .populate("lastReadChapterId", "title order")
        .sort({ updatedAt: -1 });
      return savedBooks;
    } catch (error) {
      throw new Error("Error fetching saved books: " + error.message);
    }
  }

  // static async saveBook(userId, bookId) {
  //   let saved = await SavedBook.findOne({ userId, bookId });
  //   if (!saved) {
  //     saved = new SavedBook({ userId, bookId, bookmarked: true });
  //   } else {
  //     saved.bookmarked = true; // cập nhật trạng thái đánh dấu
  //   }
  //   saved.updatedAt = new Date();
  //   await saved.save();
  //   return saved;
  // }

  static async saveFromReading(userId, bookId, chapterId) {
    let saved = await SavedBook.findOne({ userId, bookId });
    if (!saved) {
      saved = new SavedBook({
        userId,
        bookId,
        lastReadChapterId: chapterId,
        bookmarked: false,
      });
    } else {
      saved.lastReadChapterId = chapterId;
    }
    saved.updatedAt = new Date();
    await saved.save();
    return saved;
  }

  static async saveFromBookmark(userId, bookId, chapterId, bookmarked) {
    let saved = await SavedBook.findOne({ userId, bookId });

    if (!saved) {
      saved = new SavedBook({
        userId,
        bookId,
        lastReadChapterId: 1, // gán mặc định là chương 1 nếu chưa tồn tại
        bookmarked: true,
      });
    } else {
      saved.bookmarked = true; // chỉ cập nhật trạng thái bookmark
    }

    saved.updatedAt = new Date();
    await saved.save();
    return saved;
  }

  // async removeSavedBook(userId, bookId) {
  //   try {
  //     return await SavedBook.deleteOne({ userId, bookId });
  //   } catch (error) {
  //     throw new Error("Error removing saved book: " + error.message);
  //   }
  // }

  // static async updateLastReadChapter(userId, bookId, chapterId) {
  //   try {
  //     let saved = await SavedBook.findOne({ userId, bookId });
  //     if (!saved) {
  //       saved = new SavedBook({ userId, bookId, lastReadChapterId: chapterId });
  //     } else {
  //       saved.lastReadChapterId = chapterId;
  //     }
  //     saved.updatedAt = new Date();
  //     await saved.save();
  //     return saved;
  //   } catch (err) {
  //     console.error("Lỗi updateLastReadChapter:", err);
  //     throw err;
  //   }
  // }

  static async removeBookmark(userId, bookId) {
    const saved = await SavedBook.findOne({ userId, bookId });
    // if (saved) {
    //   saved.bookmarked = false;
    //   await saved.save();
    // }
    if (!saved) {
      throw new Error("Bookmark not found");
    }
    saved.bookmarked = false; // chỉ cập nhật trạng thái bookmark
    return await saved.save();
  }

  // static async toggleBookmark(userId, bookId) {
  //   let saved = await SavedBook.findOne({ userId, bookId });
  //   if (!saved) {
  //     saved = new SavedBook({ userId, bookId, bookmarked: true });
  //   } else {
  //     saved.bookmarked = !saved.bookmarked;
  //   }
  //   saved.updatedAt = new Date();
  //   await saved.save();
  //   return saved;
  // }
}

export default SavedService;
