import mongoose from "mongoose";
import dotenv from "dotenv";
import books from "./data/Books.js";
import Book from "./models/bookmodel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Book.deleteMany();
    const createdBooks = await Book.insertMany(books);
    console.log("Data imported");
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    console.log("Data destroyed!");
  } catch (error) {
    console.log(`${error}`);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
