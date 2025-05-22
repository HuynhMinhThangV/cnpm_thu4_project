import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./Screen/BookDetailScreen/BookDetail";
import HomePage from "./Screen/HomePageScreen/HomePage";
import ChapterDetailScreen from "./Screen/ChapterScreen/ChapterDetailScreen";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
