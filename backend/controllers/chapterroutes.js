import express from "express";
import { addComment, getChapter } from "../services/chapterServices.js";

const router = express.Router("/");

//4.1.3 API có đường dẫn https://cnpm-thu4-project.onrender.com/api/chapters/:id sẽ thực hiện lấy ra id của chương truyện ,
//  nội dung và username từ body của request gửi đến.
router.route("/:id").get(getChapter).post(addComment);

export default router;
