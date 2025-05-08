import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./Screen/BookDetailScreen/BookDetail";
import HomePage from "./Screen/HomePageScreen/HomePage";
import ChapterDetail from "./Screen/ChapterScreen/ChapterDetail";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/:id/:chapterId" element={<ChapterDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
