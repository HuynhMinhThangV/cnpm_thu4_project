import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookroutes from "./controllers/bookroutes.js";
import chapterroutes from "./controllers/chapterroutes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use("/api/books", bookroutes);
//4.1.4.File server.js(backend/server.js) đăng ký route /api/chapter xử lý các logic liên quan đến chapter
app.use("/api/chapters", chapterroutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
