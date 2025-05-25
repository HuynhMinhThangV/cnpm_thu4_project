import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    genres: [{ name: { type: String, required: true } }],
    author: { type: String, required: true },
    images: [{ path: { type: String, required: true } }],
    status: { type: String, required: true, enum: ["Draft", "Published"] },
  },
  {
    timestamps: true, // tạo createdAt và updatedAt
  }
);

const Book = mongoose.model("Book2", bookSchema);
export default Book;
