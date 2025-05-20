import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetail = () => {
  const { state } = useLocation();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1.0.8: Nhận dữ liệu từ HomePage.jsx và hiển thị chi tiết truyện
  useEffect(() => {
    try {
      console.log("Received book data:", state?.book); // Debug
      console.log("Received chapters:", state?.chapters); // Debug
      if (!state?.book || !state?.chapters) {
        throw new Error("Không tìm thấy truyện");
      }
      setBook(state.book);
      setChapters(state.chapters);
    } catch (error) {
      // 1.1.7: Hiển thị thông báo lỗi nếu không có dữ liệu
      console.error("Error loading book:", error); // Debug
      setError(error.message || "Không tìm thấy truyện");
      toast.error(error.message || "Không tìm thấy truyện", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }, [state]);

  // 1.0.8: Hiển thị trạng thái loading
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl bg-gray-100 min-h-screen">
        Đang tải dữ liệu truyện...
      </div>
    );
  }

  // 1.1.7: Hiển thị thông báo lỗi
  if (error || !book) {
    return (
      <div className="text-center py-10 text-red-600 text-xl bg-gray-100 min-h-screen">
        {error || "Không tìm thấy truyện"}
        {/* 1.1.8: Độc giả có thể thử lại hoặc quay lại trang trước */}
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

  // 1.0.8: Hiển thị chi tiết truyện và danh sách chương
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
            {book.publisher && (
              <p>
                <span className="font-semibold">Nhà xuất bản:</span> {book.publisher}
              </p>
            )}
            {book.publishedYear && (
              <p>
                <span className="font-semibold">Năm xuất bản:</span> {book.publishedYear}
              </p>
            )}
          </div>
        </div>
      </div>

      {chapters?.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Danh sách chương</h2>
          <ul className="space-y-2">
            {chapters.map((chapter) => (
              // 1.0.9: Độc giả nhấp vào một chương cụ thể
              // 1.0.10: BookDetail.jsx chuyển hướng đến ChapterDetail.jsx
              <li key={chapter._id}>
                <Link
                  to={`/books/${book._id}/${chapter._id}`}
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