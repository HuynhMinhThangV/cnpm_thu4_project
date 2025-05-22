import mongoose from "mongoose";

const savedBookSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  lastReadChapterId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lastReadAt: { type: Date, default: Date.now },
});

const SavedBook = mongoose.model("SavedBook", savedBookSchema);
export default SavedBook;
