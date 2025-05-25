import mongoose from "mongoose";

const chaptersData = [
  {
    //011
    title: "Chapter 1: The Beginning",
    order: 1,
    content: "This is the content of chapter 1...",
    bookId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f46"), // Harry Potter
  },
  {
    //012
    title: "Chapter 2: The Journey",
    order: 2,
    content: "This is the content of chapter 2...",
    bookId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f46"), // Harry Potter
  },
  {
    //013
    title: "Chapter 1: New Story Start",
    order: 3,
    content: "Beginning of another book's first chapter...",
    bookId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f50"), // My New Story
  },
];

export default chaptersData;
