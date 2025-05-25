// services/book.service.js
import express from "express";
import Book from "../models/booksModel.js";
// const Chapter = require("../models/chapterModel.js");
// const ReadingProgress = require("../models/readingProgress.js");
import Chapter from "../models/chapterModel.js";
import ReadingProgress from "../models/readingProgress.js";
import SavedBook from "../models/savedBookModel.js";
// import Novel from "../models/booksModel.js";

const getBookDetail = async (bookId, userId = null) => {
  console.log("🔍 [getBookDetail] bookId:", bookId);
  console.log("👤 [getBookDetail] userId:", userId);
  const book = await Book.findById(bookId).lean();
  if (!book) throw new Error("Book not found");

  const chapters = await Chapter.find({ bookId })
    .sort({ order: 1 })
    .select("_id title order createdAt")
    .lean();

  const latestChapters = await Chapter.find({ bookId })
    .sort({ createdAt: -1 })
    .limit(3)
    .select("_id title order createdAt")
    .lean();

  let lastReadChapter = null;

  if (userId) {
    const progress = await SavedBook.findOne({ bookId, userId })
      .populate("lastReadChapterId", "_id title order")
      .lean();
    if (progress?.lastReadChapterId) {
      lastReadChapter = progress.lastReadChapterId;
    }
  }

  return {
    book,
    chapters,
    latestChapters,
    lastReadChapter: lastReadChapter || chapters[0] || null, // fallback
  };
};

export default getBookDetail;
