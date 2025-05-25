import mongoose from "mongoose";
import dotenv from "dotenv";
import books from "./data/Books.js";
import Book from "./models/bookmodel.js";
import connectDB from "./config/db.js";
import SavedBook from "./models/savedBookModel.js";
import Book2 from "./models/booksModel.js";
import chapterModel from "./models/chapterModel.js";
import commentModel from "./models/commentModel.js";
import userModel from "./models/userModel.js";
import userData from "./data/users.js";
import booksData from "./data/BooksData.js";
import chaptersData from "./data/Chapters.js";
import commentsData from "./data/Comments.js";
import savedBooksData from "./data/SavedBooks.js";

dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
// connectDB();

// const importData = async () => {
//   try {
//     await Book.deleteMany();
//     const createdBooks = await Book.insertMany(books);
//     console.log("Data imported");
//   } catch (error) {
//     console.log(`${error}`);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     await Book.deleteMany();
//     console.log("Data destroyed!");
//   } catch (error) {
//     console.log(`${error}`);
//   }
// };

// if (process.argv[2] === "-d") {
//   destroyData();
// } else {
//   importData();
// }

const importNewModelsData = async () => {
  await SavedBook.deleteMany();
  await Book2.deleteMany();
  await chapterModel.deleteMany();
  await commentModel.deleteMany();
  await userModel.deleteMany();

  await userModel.insertMany(userData);
  await Book2.insertMany(booksData);
  await chapterModel.insertMany(chaptersData);
  await commentModel.insertMany(commentsData);
  await SavedBook.insertMany(savedBooksData);
  console.log("New models data imported successfully");
};

const destroyNewModelsData = async () => {
  await SavedBook.deleteMany();
  await Book2.deleteMany();
  await chapterModel.deleteMany();
  await commentModel.deleteMany();
  await userModel.deleteMany();
  console.log("New models data destroyed successfully");
};

const run = async () => {
  await connectDB();
  const arg = process.argv[2];

  switch (arg) {
    case "-d":
      await destroyNewModelsData();
      break;
    case "-i":
      await importNewModelsData();
      break;
    default:
      console.log(
        "Invalid argument. Use -d to destroy data or -i to import data."
      );
      process.exit(0);
  }
};

run();
