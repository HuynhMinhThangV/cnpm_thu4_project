import React, { useEffect, useState } from "react";
import { getCurrentParams } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChapterDetailScreen = () => {
  const location = useLocation();
  const [chapter, setChapter] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const param = getCurrentParams(location);
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`/api/chapters/${param}`);
        setChapter(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.log(`Error ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [param]);
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      // 4.1.3. Hệ thống gọi API POST /api/chapters/:id gửi lên dữ liệu:
      // 	user: tên người dùng (ví dụ: "User Example"),
      // 	chapterId: id của chương đang xem (lấy từ URL),
      // 	content: nội dung bình luận do người dùng nhập.
      const response = await axios.post(`${API_BASE_URL}/chapters/${param}`, {
        user: "User Example",
        chapterId: param,
        content: comment,
      });
      // 4.1.12. Frontend nhận phản hồi thành công từ server
      // thêm bình luận mới vào danh sách comments trong state để hiển thị ngay cho người dùng.
      setComments([
        ...comments,
        response.data.chapter.comments[
          response.data.chapter.comments.length - 1
        ],
      ]);
    } catch (error) {
      //4.3.3. Frontend nhận được phản hồi lỗi trong error.response.
      if (error.response) {
        //4.3.4. Hệ thống hiển thị thông báo lỗi cho người dùng "Không tìm thấy sách"
        toast.error(error.response.data?.message || "Lỗi từ server");
      }
      //4.4.1 Request được gửi thành công, nhưng không nhận được phản hồi từ server trong khoảng thời gian quy định (timeout hoặc server không hoạt động).
      else if (error.request) {
        //4.4.2 Hệ thống hiển thị thông báo lỗi cho người dùng “Không thể kết nối đến server. Có thể server đang bảo trì.”
        toast.error(
          "Không thể kết nối đến server. Có thể server đang bảo trì."
        );
        //4.2.1. Frontend bắt được lỗi không phải của server.
      } else {
        //4.2.2. Hiển thị thông báo toast(“Vui lòng kiểm tra lại kết nối mạng”).
        toast.error("Vui lòng kiểm tra lại kết nối mạng.");
      }
    }
  };
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl">
        Đang tải chương...
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="text-center py-10 text-red-600 text-xl">
        Không tìm thấy chương.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{chapter.title}</h1>
      <div
        className="prose max-w-none prose-headings:text-gray-800 prose-p:text-gray-700"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bình luận</h2>
        <ul className="space-y-4">
          {comments &&
            comments.map((comment, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg">
                <p className="font-semibold">{comment.user}</p>
                <p>{comment.content}</p>
              </li>
            ))}
        </ul>
        {/* 4.1.1.Độc giả nhập nội dung vào ô "Viết bình luận của bạn..." */}
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="4"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Viết bình luận của bạn..."
          />
          {/* 4.1.2. Độc giả nhấn nút gửi bình luận */}
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Gửi bình luận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChapterDetailScreen;
