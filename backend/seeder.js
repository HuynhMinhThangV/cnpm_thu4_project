import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs/promises"; // Thêm module fs để đọc books.json
import books from "./data/Books.js"; // Giữ nguyên dữ liệu bạn của bạn
import Book from "./models/bookmodel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

/*
Nếu dùng câu lệnh: node seeder.js thì sẽ lấy dữ liệu từ file "books.json"
Nếu dùng câu lệnh: node seeder.js -b thì sẽ lấy dữ liệu giả từ trong thư mục backend/data/book.json
*/

const importData = async () => {
  try {
    // Kiểm tra tham số dòng lệnh
    let dataToImport = books; // Mặc định dùng Books.js
    if (process.argv[2] !== "-b") {
      // Nếu không có -b, dùng books.json
      dataToImport = JSON.parse(await fs.readFile("../books.json", "utf8"));
      console.log("Đang nhập dữ liệu từ books.json");
    } else {
      console.log("Đang nhập dữ liệu từ Books.js");
    }

    // Xóa dữ liệu cũ
    await Book.deleteMany();
    console.log("Đã xóa dữ liệu cũ");

    // Nhập dữ liệu (giữ nguyên dòng bạn yêu cầu)
    const createdBooks = await Book.insertMany(dataToImport);
    console.log("Đã nhập dữ liệu thành công:", createdBooks.length, "sách");

    process.exit();
  } catch (error) {
    console.error("Lỗi khi nhập dữ liệu:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    console.log("Đã xóa toàn bộ dữ liệu!");
    process.exit();
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
    process.exit(1);
  }
};

// Kiểm tra tham số dòng lệnh
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}