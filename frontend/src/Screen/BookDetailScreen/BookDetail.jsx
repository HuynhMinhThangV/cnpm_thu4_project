import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentParams } from "../../utils/utils";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BookDetail = () => {
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = getCurrentParams(location);

  // 1.0.8: HomePage.jsx chuyển hướng đến BookDetail.jsx, hiển thị chi tiết truyện và danh sách chương
  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("Received book data from state:", location.state?.book); // Debug
        console.log("Received chapters from state:", location.state?.chapters); // Debug
        // Ưu tiên dữ liệu từ state
        if (location.state?.book && location.state?.chapters) {
          setBook(location.state.book);
          setBook((prev) => ({ ...prev, chapters: location.state.chapters }));
        } else {
          // Nếu không có state, gọi API
          const response = await axios.get(`${API_BASE_URL}/books/${params}`);
          console.log("Book response:", response.data); // Debug
          setBook(response.data);
        }
      } catch (error) {
        // 1.1.7: BookDetail.jsx hiển thị thông báo lỗi
        console.error("Error loading book:", {
          message: error.message,
          response: error.response?.data,
        });
        setError(error.response?.data?.message || "Không tìm thấy truyện");
        toast.error(error.response?.data?.message || "Không tìm thấy truyện", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [params, location.state]);

  // 1.0.8: Hiển thị trạng thái loading
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl bg-gray-100 min-h-screen">
        Đang tải dữ liệu sách...
      </div>
    );
  }

  // 1.1.7: BookDetail.jsx hiển thị thông báo lỗi
  if (error || !book) {
    return (
      <div className="text-center py-10 text-red-600 text-xl bg-gray-100 min-h-screen">
        {error || "Không tìm thấy truyện"}
        {/* 1.1.8: Độc giả thử lại hoặc quay lại trang trước */}
        <div className="mt-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
          >
            Thử lại
          </button>
          <Link to="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // 1.0.8: HomePage.jsx chuyển hướng đến BookDetail.jsx, hiển thị chi tiết truyện và danh sách chương
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <img
          src={book.images?.[0]?.path || "https://via.placeholder.com/150"}
          alt={book.title || "Không có tiêu đề"}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{book.title || "Không có tiêu đề"}</h1>
          <p className="text-gray-600 mb-2">Tác giả: {book.author || "Không rõ tác giả"}</p>
          <p className="text-gray-500 mb-4">
            Thể loại: {book.genres?.map((g) => g.name).join(", ") || "Không có thể loại"}
          </p>
          {book.description && (
            <p className="text-gray-700 leading-relaxed mb-4">{book.description}</p>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Nhà xuất bản:</span>{" "}
              {book.publisher || book.author || "Không rõ"}
            </p>
            <p>
              <span className="font-semibold">Năm xuất bản:</span>{" "}
              {book.publishedYear || book.status || "Không rõ"}
            </p>
          </div>
        </div>
      </div>

      {book.chapters?.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Danh sách chương</h2>
          <ul className="space-y-2">
            {book.chapters.map((chapter) => (
              // 1.0.9: Độc giả nhấp vào chương trong BookDetail.jsx
              <li key={chapter._id}>
                <Link
                  to={`/books/${book._id}/${chapter._id.toString()}`}
                  className="text-blue-600 hover:underline"
                >
                  📘 {chapter.title || "Chương không có tiêu đề"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-10 text-gray-600">Không có chương nào để hiển thị.</div>
      )}
    </div>
  );
};

export default BookDetail;