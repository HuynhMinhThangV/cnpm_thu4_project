import { useState } from "react";

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState("viewed");

  // Dữ liệu mẫu, bạn sẽ thay bằng API thực sau
  const viewedStories = [
    { id: 1, title: "Truyện 1", author: "Tác giả A" },
    { id: 2, title: "Truyện 2", author: "Tác giả B" },
  ];
  const bookmarkedStories = [
    { id: 3, title: "Truyện 3", author: "Tác giả C" },
    { id: 4, title: "Truyện 4", author: "Tác giả D" },
  ];

  const currentList =
    activeTab === "viewed" ? viewedStories : bookmarkedStories;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`pb-2 px-4 font-semibold ${
            activeTab === "viewed"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("viewed")}
        >
          Đã xem
        </button>
        <button
          className={`pb-2 px-4 font-semibold ${
            activeTab === "bookmarked"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("bookmarked")}
        >
          Đánh dấu
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentList.length === 0 ? (
          <p className="text-gray-500 col-span-full">Chưa có truyện nào.</p>
        ) : (
          currentList.map((story) => (
            <div
              key={story.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg">{story.title}</h3>
              <p className="text-sm text-gray-600">{story.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
