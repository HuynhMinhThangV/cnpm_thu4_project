import React, { useState } from "react";
import { searchBook } from "../../utils/ApiService";

// 2.1.1: Người dùng khởi tạo tìm kiếm bằng SearchComponent
const SearchComponent = ({ onResults }) => {
  const [criteria, setCriteria] = useState({ title: "", author: "", genres: "", keyword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 2.1.2: Gọi ApiService.searchBook(criteria)
    const genresArr = criteria.genres ? criteria.genres.split(",").map(g => g.trim()) : undefined;
    const results = await searchBook({ ...criteria, genres: genresArr });
    // 2.1.13: Trả kết quả về HomePage để hiển thị
    onResults(results);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
      <input
        type="text"
        name="title"
        placeholder="Tên truyện"
        value={criteria.title}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        name="author"
        placeholder="Tác giả"
        value={criteria.author}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        name="genres"
        placeholder="Thể loại (cách nhau dấu phẩy)"
        value={criteria.genres}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        name="keyword"
        placeholder="Từ khóa"
        value={criteria.keyword}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading}>
        {loading ? "Đang tìm..." : "Tìm kiếm"}
      </button>
    </form>
  );
};

export default SearchComponent; 