import mongoose from "mongoose";
import Book2 from "../models/booksModel"; // Assuming you have a book model

const savedBooksData = [
  {
    userId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f43"), // testuser
    bookId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f46"), // Harry Potter
    lastReadChapterId: new mongoose.Types.ObjectId(), // hoặc chapter id cụ thể
    bookmarked: true,
    updatedAt: new Date("2025-05-01T10:00:00Z"),
  },
  {
    userId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f43"), // testuser
    bookId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f4a"), // One Piece
    lastReadChapterId: new mongoose.Types.ObjectId(),
    bookmarked: false,
    updatedAt: new Date("2025-05-15T08:30:00Z"),
  },
  {
    userId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f43"), // testuser
    bookId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f50"), // My New Story
    lastReadChapterId: null,
    bookmarked: true,
    updatedAt: new Date("2025-05-20T12:00:00Z"),
  },
];

export default savedBooksData;
