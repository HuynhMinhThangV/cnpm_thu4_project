import mongoose from "mongoose";
const savedBookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book2",
    required: true,
  },
  lastReadChapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  bookmarked: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});
const SavedBook = mongoose.model("SavedBook", savedBookSchema);
export default SavedBook;
