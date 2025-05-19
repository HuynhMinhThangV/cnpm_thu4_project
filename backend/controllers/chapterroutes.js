import express from "express";
import { addComment, getChapter } from "../services/chapterServices.js";

const router = express.Router("/");

//4.1.4. Backend (chapterroutes.js) nhận request POST tại route /api/chapters/:id và
// gọi hàm addComment trong package services (chapterServices.js).
router.route("/:id").get(getChapter).post(addComment);

export default router;
