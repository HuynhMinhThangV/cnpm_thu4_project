import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chapterSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: [
    {
      path: {
        type: String,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  genres: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  chapters: [chapterSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

//2.1.8/2.2.8: Tạo model Book và export kết quả cho BookService
//2.1.9/2.2.9: BookModel trả kết quả cho BookService
const Book = mongoose.model("Book", bookSchema);
export default Book;
