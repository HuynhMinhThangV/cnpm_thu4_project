import mongoose from "mongoose";

const booksData = [
  {
    _id: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f46"), // cố định
    title: "Harry Potter and the Philosopher's Stone",
    description:
      "A young wizard discovers his magical heritage and attends Hogwarts.",
    genres: [{ name: "Fantasy" }, { name: "Adventure" }],
    author: "J.K. Rowling",
    images: [{ path: "https://example.com/images/harry1.jpg" }],
    status: "Published",
  },
  {
    _id: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f4a"), // cố định
    title: "One Piece",
    description: "A story of pirates searching for the ultimate treasure.",
    genres: [{ name: "Adventure" }, { name: "Action" }],
    author: "Eiichiro Oda",
    images: [{ path: "https://example.com/images/onepiece.jpg" }],
    status: "Published",
  },
  {
    _id: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f50"), // thêm id cố định cho dễ liên kết
    title: "My New Story",
    description: "This is a new manga being written by an indie author.",
    genres: [{ name: "Romance" }],
    author: "John Doe",
    images: [{ path: "https://example.com/images/romance.jpg" }],
    status: "Draft",
  },
];

export default booksData;
