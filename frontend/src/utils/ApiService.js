import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 2.1.3: ApiService gửi GET /api/books/search?criteria=... đến BookController
export const searchBook = async (criteria) => {
  try {
    const params = {};
    if (criteria.title) params.title = criteria.title;
    if (criteria.author) params.author = criteria.author;
    if (criteria.genres) params.genres = criteria.genres.join(",");
    if (criteria.keyword) params.keyword = criteria.keyword;
    const response = await axios.get(`${API_BASE_URL}/books/search`, { params });
    // 2.1.12: ApiService trả kết quả cho SearchComponent
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // 2.2.18: ApiService trả mảng rỗng nếu không tìm thấy
      return [];
    }
    throw error;
  }
}; 