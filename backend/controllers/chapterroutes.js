import express from "express";
import { addComment, getChapter } from "../services/chapterServices.js";

const router = express.Router("/");

router.route("/:id").get(getChapter).post(addComment);

export default router;
