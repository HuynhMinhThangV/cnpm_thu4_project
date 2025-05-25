import mongoose from "mongoose";
// models/Chapter.js
const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    content: { type: String, required: true },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book2",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chapter", chapterSchema);
