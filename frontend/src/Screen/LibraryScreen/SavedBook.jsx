// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const SavedBooks = () => {
//   const [savedBooks, setSavedBooks] = useState([]);
//   const [activeTab, setActiveTab] = useState("reading");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSavedBooks = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/savedbooks`, {
//           withCredentials: true,
//         });
//         setSavedBooks(res.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           // Nếu chưa đăng nhập, chuyển hướng sang trang login
//           navigate("/login");
//         }
//       }
//     };

//     fetchSavedBooks(); //72 errror
//   }, [navigate]);

//   const handleDelete = async (savedBookId) => {
//     if (!window.confirm("Bạn có chắc muốn xóa truyện này khỏi tủ truyện?"))
//       return;
//     try {
//       await axios.delete(`${API_BASE_URL}/savedbooks/${savedBookId}`, {
//         withCredentials: true,
//       });
//       // Cập nhật lại danh sách
//       setSavedBooks((prev) => prev.filter((book) => book._id !== savedBookId));
//     } catch (error) {
//       console.error("Lỗi khi xóa sách:", error);
//     }
//   };

//   const readingBooks = savedBooks.filter((book) => !book.bookmarked);
//   const bookmarkedBooks = savedBooks.filter((book) => book.bookmarked);
//   const displayBooks = activeTab === "reading" ? readingBooks : bookmarkedBooks;

//   if (savedBooks.length === 0) {
//     return <p>Bạn chưa lưu sách nào trong tủ truyện.</p>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">📚 Tủ truyện</h1>

//       <ul className="space-y-4">
//         {savedBooks.map(({ _id, bookId, lastReadChapterId, updatedAt }) => (
//           <li
//             key={_id}
//             className="flex items-center bg-[#1e1e1e] text-white rounded-lg p-4 shadow-md"
//           >
//             <img
//               src={bookId.images?.[0]?.path || "/default.jpg"}
//               alt={bookId.title}
//               className="w-16 h-24 object-cover rounded"
//             />

//             <div className="ml-4 flex-1">
//               <Link
//                 to={`/books/${bookId._id}`}
//                 className="text-lg font-semibold hover:text-blue-400"
//               >
//                 {bookId.title}
//               </Link>
//               <p className="text-sm mt-1">
//                 Đã đọc: {lastReadChapterId?.index || 0}/
//                 {bookId.totalChapters || "?"}
//               </p>
//             </div>

//             <div className="text-sm text-blue-300 mr-4 whitespace-nowrap">
//               {new Date(updatedAt).toLocaleTimeString("vi-VN", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}{" "}
//               {new Date(updatedAt).toLocaleDateString("vi-VN", {
//                 day: "2-digit",
//                 month: "2-digit",
//               })}
//             </div>

//             <button
//               onClick={() => handleDelete(_id)}
//               className="text-white hover:text-red-500 text-xl"
//               title="Xóa khỏi tủ truyện"
//             >
//               &times;
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SavedBooks;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("reading"); // "reading" | "bookmarked"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/savedbooks`, {
          withCredentials: true,
        });
        setSavedBooks(res.data);
        console.log("Saved books:", res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchSavedBooks();
  }, [navigate]);

  const handleDelete = async (savedBookId) => {
    if (!window.confirm("Bạn có chắc muốn xóa truyện này khỏi tủ truyện?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/savedbooks/${savedBookId}`, {
        withCredentials: true,
      });
      setSavedBooks((prev) => prev.filter((book) => book._id !== savedBookId));
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
      console.log("Status:", error.response?.status);
      console.log("Response data:", error.response?.data);
    }
  };

  const readingBooks = savedBooks.filter((book) => !book.bookmarked);
  const bookmarkedBooks = savedBooks.filter((book) => book.bookmarked);

  const renderBooks = (books) =>
    books.length === 0 ? (
      <p className="text-gray-400">Không có truyện nào trong mục này.</p>
    ) : (
      <ul className="space-y-4">
        {books.map(
          ({ _id, bookId, lastReadChapterId, updatedAt, bookmarked }) => (
            <li
              key={_id}
              className="flex items-center bg-[#1e1e1e] text-white rounded-lg p-4 shadow-md"
            >
              <img
                src={bookId.images?.[0]?.path || "/default.jpg"}
                alt={bookId.title}
                className="w-16 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <Link
                  to={`/books/${bookId._id}`}
                  className="text-lg font-semibold hover:text-blue-400"
                >
                  {bookId.title}
                </Link>
                <p className="text-sm mt-1">
                  Đã đọc: {lastReadChapterId?.order || 0}/
                  {bookId.totalChapters || "?"}
                </p>
              </div>
              <div className="text-sm text-blue-300 mr-4 whitespace-nowrap">
                {new Date(updatedAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                {new Date(updatedAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </div>

              {/* Xóa */}
              <button
                onClick={() => handleDelete(_id)}
                className="text-white hover:text-red-500 text-xl"
                title="Xóa khỏi tủ truyện"
              >
                &times;
              </button>
            </li>
          )
        )}
      </ul>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Tủ truyện</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-600 mb-6">
        <button
          onClick={() => setActiveTab("reading")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "reading"
              ? "bg-[#b78a28] text-white rounded-t"
              : "bg-[#e4dece] text-black rounded-t"
          }`}
        >
          TRUYỆN ĐANG ĐỌC
        </button>
        <button
          onClick={() => setActiveTab("bookmarked")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "bookmarked"
              ? "bg-[#b78a28] text-white rounded-t"
              : "bg-[#e4dece] text-black rounded-t"
          }`}
        >
          TRUYỆN ĐÁNH DẤU
        </button>
      </div>

      {/* Danh sách sách */}
      {activeTab === "reading"
        ? renderBooks(readingBooks)
        : renderBooks(bookmarkedBooks)}
    </div>
  );
};

export default SavedBooks;
