import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books`);
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-white">Đang tải truyện...</div>
    );

  if (!books.length)
    return (
      <div className="text-center mt-10 text-white">Không có truyện nào.</div>
    );

  return (
    <div className="bg-zinc-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Danh sách truyện</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {books.map((book) => {
          const coverImage =
            book.images && book.images.length > 0
              ? book.images[0].path
              : "/default_cover.jpg";
          return (
            <div
              key={book._id}
              onClick={() => navigate(`/books/${book._id}`)}
              className="cursor-pointer bg-gray-800 rounded shadow hover:shadow-lg transition p-4"
            >
              <img
                src={coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-3"
                loading="lazy"
              />
              <h2 className="text-xl font-semibold truncate">{book.title}</h2>
              <p className="text-gray-400 truncate">Tác giả: {book.author}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
