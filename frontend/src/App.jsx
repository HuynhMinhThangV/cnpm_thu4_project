import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Screen/HomePageScreen/HomePage";
import BookDetail from "./Screen/BookDetailScreen/BookDetail";
import ChapterDetailScreen from "./Screen/ChapterScreen/ChapterDetailScreen";
import Header from "./components/Header";
import LibraryPage from "./Screen/LibraryScreen/LibraryPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/:id/:chapterId" element={<ChapterDetailScreen />} />
        <Route path="/tu-truyen" element={<LibraryPage />} />
        <Route path="/tim-kiem" element={<div>Tìm Kiếm</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
