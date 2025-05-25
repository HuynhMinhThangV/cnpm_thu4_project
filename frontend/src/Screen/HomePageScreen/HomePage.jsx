import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Lấy danh sách truyện để hiển thị
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error("API_BASE_URL không được định nghĩa");
        }
        console.log("Fetching books from:", `${API_BASE_URL}/books`); // Debug
        const response = await axios.get(`${API_BASE_URL}/books`);
        console.log("Books response:", response.data); // Debug
        const data = Array.isArray(response.data) ? response.data : [];
        setBooks(data);
      } catch (error) {
        // 1.1.7: HomePage.jsx hiển thị thông báo lỗi
        console.error("Error fetching books:", {
          message: error.message,
          response: error.response?.data,
        });
        setError(error.response?.data?.message || "Không tìm thấy truyện");
        toast.error(error.response?.data?.message || "Không tìm thấy truyện", {
          position: "top-right",
        });
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 1.0.1: Độc giả nhấp vào truyện từ HomePage.jsx
  // 1.0.2: HomePage.jsx gửi GET /api/books/:bookId đến bookroutes.js
  const handleBookClick = async (bookId) => {
    try {
      console.log("Fetching book with bookId:", bookId); // Debug
      const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
      // 1.0.3: bookroutes.js gọi book-services.js (await Book.findOne({"_id": bookId}))
      // 1.0.4: book-services.js truy vấn MongoDB Atlas (doctruyenDB, collection Books)
      // 1.0.5: MongoDB trả về dữ liệu truyện và danh sách chương
      // 1.0.6: book-services.js trả dữ liệu về bookroutes.js
      // 1.0.7: bookroutes.js trả về res.status(200).json({book, chapters})
      console.log("Book response:", response.data); // Debug
      if (!response.data.book) {
        throw new Error("Không tìm thấy truyện");
      }
      // 1.0.8: HomePage.jsx chuyển hướng đến BookDetail.jsx, hiển thị chi tiết truyện và danh sách chương
      navigate(`/books/${bookId}`, {
        state: { book: response.data.book, chapters: response.data.chapters },
      });
    } catch (error) {
      // 1.1.5: book-services.js trả lỗi cho bookroutes.js
      // 1.1.6: bookroutes.js trả res.status(404).json({message: "Không tìm thấy truyện"})
      // 1.1.7: HomePage.jsx hiển thị thông báo lỗi
      console.error("Error fetching book:", {
        message: error.message,
        response: error.response?.data,
      });
      toast.error(error.response?.data?.message || "Không tìm thấy truyện", {
        position: "top-right",
      });
    }
  };

  // 1.0.8: Hiển thị trạng thái loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  // 1.1.7: HomePage.jsx hiển thị thông báo lỗi
  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-xl bg-gray-100 min-h-screen">
        {error}
        {/* 1.1.8: Độc giả có thể thử lại */}
        <div className="mt-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // 1.0.8: Hiển thị danh sách truyện
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-[1400px] mx-auto px-4 py-10 mt-20 bg-gray-100 min-h-screen">
        {books.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-xl">
            Không có truyện nào để hiển thị
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Tải lại
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              // 1.0.1: Độc giả nhấp vào truyện từ HomePage.jsx
              <div
                key={book._id}
                onClick={() => handleBookClick(book._id.toString())}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 hover:border-gray-400 overflow-hidden cursor-pointer"
              >
                <img
                  src={book.images?.[0]?.path || "https://via.placeholder.com/150"}
                  alt={book.title || "Không có tiêu đề"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1 truncate">
                    {book.genres?.map((g) => g.name).join(", ") || "Không có thể loại"}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {book.title || "Không có tiêu đề"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{book.author || "Không rõ tác giả"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;