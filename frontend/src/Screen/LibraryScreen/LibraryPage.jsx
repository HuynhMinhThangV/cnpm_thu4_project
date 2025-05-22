import React from "react";
import { FaBell, FaRegBell, FaTimes } from "react-icons/fa";

const dummyData = [
  {
    id: 1,
    name: "Để Người Quản Lý Phế Vật...",
    image: "link_to_image_1",
    chaptersRead: 813,
    totalChapters: 813,
    lastReadTime: "11 giờ trước",
    notify: true,
  },
  {
    id: 2,
    name: "Không Phải, Ta Điện Tử Bạn Gái...",
    image: "link_to_image_2",
    chaptersRead: 373,
    totalChapters: 514,
    lastReadTime: "5 ngày trước",
    notify: false,
  },
];

const TuTruyen = () => {
  return (
    <div className="bg-gray-900 text-white p-4 space-y-4">
      {dummyData.map((book) => (
        <div
          key={book.id}
          className="flex items-center bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition"
        >
          <img
            src={book.image}
            alt={book.name}
            className="w-16 h-20 object-cover rounded-md mr-4"
          />
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{book.name}</h3>
            <p className="text-gray-400 text-xs">
              Đã đọc: {book.chaptersRead}/{book.totalChapters}
            </p>
          </div>
          <div className="text-right text-sm text-gray-400 mr-2 w-28">
            {book.lastReadTime}
          </div>
          <button className="mx-2">
            {book.notify ? (
              <FaBell className="text-yellow-500" />
            ) : (
              <FaRegBell className="text-white" />
            )}
          </button>
          <button className="text-gray-300 hover:text-red-500">
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TuTruyen;
