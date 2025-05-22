// routes/savedBookRoutes.js
import express from "express";
import {
  saveOrUpdateBookProgress,
  getSavedBooksByUser,
} from "../services/savedBookService.js";

const router = express.Router();

router.post("/save-or-update", saveOrUpdateBookProgress);
router.get("/user/:userId", getSavedBooksByUser);

export default router;
