import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentParams } from "../../utils/utils";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BookDetail = () => {
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = getCurrentParams(location);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/books/${params}`);
        setBook(response.data);
      } catch (error) {
        console.log(`Error ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [params]);
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl">
        Đang tải dữ liệu sách...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <img
          src={book.images[0]?.path}
          alt={book.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {book.title}
          </h1>
          <p className="text-gray-600 mb-2">Tác giả: {book.author}</p>
          <p className="text-gray-500 mb-4">
            Thể loại: {book.genres.map((g) => g.name).join(", ")}
          </p>
          {book.description && (
            <p className="text-gray-700 leading-relaxed mb-4">
              {book.description}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            {book.author && (
              <p>
                <span className="font-semibold">Nhà xuất bản:</span>{" "}
                {book.author}
              </p>
            )}
            {book.status && (
              <p>
                <span className="font-semibold">Năm xuất bản:</span>{" "}
                {book.status}
              </p>
            )}
          </div>
        </div>
      </div>

      {book.chapters && book.chapters.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Danh sách chương
          </h2>
          <ul className="space-y-2">
            {book.chapters.map((chapter) => (
              <li key={chapter._id}>
                <Link
                  to={`/books/${book._id}/${chapter._id}`}
                  className="text-blue-600 hover:underline"
                >
                  📘 {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
