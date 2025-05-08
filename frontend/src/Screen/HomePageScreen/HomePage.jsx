import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        console.log("Error when trying to call API", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 py-10 mt-20">
        <div className="flex justify-evenly space-x-5">
          {books.map((book) => (
            <Link
              to={`/books/${book._id}`}
              key={book._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 hover:border-gray-400 overflow-hidden m-5"
            >
              <img
                src={book.images[0]?.path}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1 truncate">
                  {book.genres.map((g) => g.name).join(", ")}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
