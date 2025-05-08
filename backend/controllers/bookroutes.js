import express from "express";
import { getBook, getBooks } from "../services/bookServices.js";
const router = express.Router();

router.route("/").get(getBooks);
router.route("/:id").get(getBook);

export default router;
