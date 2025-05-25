import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./Screen/BookDetailScreen/BookDetail";
import HomePage from "./Screen/HomePageScreen/HomePage";
import ChapterDetailScreen from "./Screen/ChapterScreen/ChapterDetailScreen";
import SavedBooks from "./Screen/LibraryScreen/SavedBook";
import Menu from "./components/Menu";
import Login from "./Screen/Login";
import BookDetail_NewModel from "./Screen/BookDetailScreen/BookDetail_NewModel";
import ChapterPage from "./Screen/ChapterScreen/Chapter";
import MainPage from "./Screen/HomePageScreen/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/books/:id" element={<BookDetail />} /> */}
        <Route path="/books/:bookId" element={<BookDetail_NewModel />} />
        {/* <Route path="/books/:id/:chapterId" element={<ChapterDetailScreen />} /> */}
        <Route path="/chapter/:chapterId" element={<ChapterPage />} />
        <Route path="/savedbooks" element={<SavedBooks />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
