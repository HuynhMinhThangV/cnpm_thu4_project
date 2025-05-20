import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChapterDetail = () => {
  const { bookId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1.0.10: ChapterDetail.jsx gửi GET /api/chapters/:chapterId đến chapterroutes.js
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error("API_BASE_URL không được định nghĩa");
        }
        console.log("Fetching chapter with chapterId:", chapterId); // Debug
        console.log("API URL:", `${API_BASE_URL}/chapters/${chapterId}`); // Debug
        const response = await axios.get(`${API_BASE_URL}/chapters/${chapterId}`);
        // 1.0.11: (Backend) chapterroutes.js gọi chapter-services.js (await Book.findOne({"chapters._id": chapterId}))
        // 1.0.12: (Backend) chapter-services.js truy vấn MongoDB Atlas (doctruyenDB, collection Books, trường chapters)
        // 1.0.13: (Backend) MongoDB trả về nội dung chương
        // 1.0.14: (Backend) Nếu độc giả đăng nhập, cập nhật trạng thái "đã đọc"
        // 1.0.15: (Backend) MongoDB xác nhận cập nhật
        // 1.0.16: (Backend) chapter-services.js trả nội dung chương về chapterroutes.js
        // 1.0.17: chapterroutes.js trả về res.status(200).json({content})
        console.log("Chapter response:", response.data); // Debug
        if (!response.data.content) {
          throw new Error("Không tìm thấy chương");
        }
        setChapter(response.data.content);
      } catch (error) {
        // 1.3.13: (Backend) chapter-services.js trả lỗi
        // 1.3.14: (Backend) chapterroutes.js trả res.status(404).json({message: "Không tìm thấy chương"})
        // 1.3.15: ChapterDetail.jsx hiển thị thông báo lỗi
        console.error("Error fetching chapter:", error.response?.data, error); // Debug
        toast.error(error.response?.data?.message || "Không tìm thấy chương", { position: "top-right" });
        setChapter(null);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [chapterId]);

  // 1.0.18: Hiển thị trạng thái loading
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl bg-gray-100 min-h-screen">
        Đang tải chương...
      </div>
    );
  }

  // 1.3.15: Hiển thị thông báo lỗi
  if (!chapter) {
    return (
      <div className="text-center py-10 text-red-600 text-xl bg-gray-100 min-h-screen">
        Không tìm thấy chương
        {/* 1.3.16: Độc giả có thể thử lại hoặc quay lại trang chi tiết truyện */}
        <div className="mt-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
          >
            Thử lại
          </button>
          <Link
            to={`/books/${bookId}`}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            Quay lại chi tiết truyện
          </Link>
        </div>
      </div>
    );
  }

  // 1.0.18: Hiển thị nội dung chương
  // 1.2.18: Hiển thị nội dung chương dù không đánh dấu "đã đọc"
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{chapter.title || "Chương không có tiêu đề"}</h1>
      <div
        className="prose max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 bg-white p-6 rounded-lg shadow"
        dangerouslySetInnerHTML={{ __html: chapter.content || "<p>Không có nội dung</p>" }}
      />
    </div>
  );
};

export default ChapterDetail;