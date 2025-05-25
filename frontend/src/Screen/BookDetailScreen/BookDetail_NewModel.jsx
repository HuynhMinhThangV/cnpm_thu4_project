import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BookDetail_NewModel = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`${API_BASE_URL}/books/${bookId}`, {
        withCredentials: true,
      });
      setBookData(res.data);
    };
    fetchDetail();
  }, [bookId]);

  const handleBookmark = async () => {
    setBookmarkLoading(true);
    console.log("1");
    try {
      console.log("2");
      await axios.post(
        `${API_BASE_URL}/savedbooks/bookmark`,
        { bookId: bookId }, // chapter là state chứa chương đang đọc
        { withCredentials: true }
      );
      console.log("3");
      setIsBookmarked(true);
      console.log("4");
      alert("Đã lưu sách vào tủ truyện (đánh dấu bookmark)!");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Bạn cần đăng nhập để lưu sách.");
        // redirect login nếu muốn
      } else {
        alert("Lỗi khi lưu sách, vui lòng thử lại.");
        console.error(err);
      }
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (!bookData) return <div className="text-white p-4">Đang tải...</div>;

  const { book, chapters, latestChapters, lastReadChapter } = bookData;

  return (
    <div className="relative text-white bg-gray-900 p-6 rounded-md shadow-lg">
      {/* Mục Lục Popup */}
      {showTableOfContents && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40"></div>
          <div className="fixed top-1/2 left-1/2 z-50 w-3/4 max-h-[80%] overflow-y-auto bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mục Lục</h2>
              <button
                onClick={() => setShowTableOfContents(false)}
                className="text-red-400 hover:text-red-600"
              >
                Đóng ✕
              </button>
            </div>
            <ul className="space-y-2">
              {chapters.map((chapter) => (
                <li
                  key={chapter._id}
                  className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                  onClick={() => {
                    navigate(`/chapter/${chapter._id}`);
                  }}
                >
                  {chapter.title}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Nội dung chính */}
      <div className={showTableOfContents ? "blur-sm pointer-events-none" : ""}>
        <div className="flex gap-4">
          {/* Ảnh bìa */}
          <img
            src={book.images?.[0]?.path || "/no-cover.jpg"}
            alt={book.title}
            className="w-28 h-40 object-cover rounded shadow"
          />

          {/* Thông tin sách */}
          <div className="flex-1 text-left">
            {/* 1. Tên sách */}
            <h1 className="text-2xl font-bold">{book.title}</h1>

            {/* 2. Tên tác giả */}
            <p className="text-gray-400 text-sm mt-1">
              {book.author || "Tác giả không rõ"}
            </p>

            {/* 3. Nút hành động */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setShowTableOfContents(true)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded text-sm"
              >
                Mục Lục
              </button>
              <button
                onClick={handleBookmark}
                disabled={bookmarkLoading || isBookmarked}
                // className="bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded text-sm"
                className={`px-3 py-1 rounded ${
                  isBookmarked
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-400"
                }`}
              >
                {isBookmarked ? "Đã lưu" : "Lưu vào tủ truyện"}
              </button>
            </div>

            {/* 4. Trạng thái sách */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                {book.comments || 0} Bình luận
              </span>
              <span
                className={`${
                  book.status === "Published" ? "bg-red-700" : "bg-green-700"
                } text-xs px-2 py-1 rounded`}
              >
                {book.status === "Published" ? "Đã Full" : "Còn tiếp"}
              </span>
            </div>

            {/* 5. Thể loại */}
            <div className="mt-3 flex gap-2 flex-wrap">
              {book.genres?.map((tag, i) => (
                <span
                  key={i}
                  className="border border-green-400 text-green-400 text-xs px-2 py-1 rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Danh sách chương mới nhất */}
        <div className="mt-6">
          <div className="bg-gray-800 px-4 py-2 text-sm font-semibold rounded-t">
            CHƯƠNG MỚI
          </div>
          <div className="bg-gray-900 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-b">
            {latestChapters
              .slice()
              .sort((a, b) => b.order - a.order)
              .map((chapter) => (
                <div
                  key={chapter._id}
                  className="cursor-pointer hover:text-red-400"
                  onClick={() =>
                    (window.location.href = `/chapter/${chapter._id}`)
                  }
                >
                  <div className="font-medium text-sm">{chapter.title}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(chapter.createdAt).toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail_NewModel;
