import mongoose from "mongoose";
// models/Comment.js
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Comment", commentSchema);
