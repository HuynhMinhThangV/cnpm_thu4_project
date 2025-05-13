import React, { useEffect, useState } from "react";
import { getCurrentParams } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChapterDetail = () => {
  const location = useLocation();
  const [chapter, setChapter] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const param = getCurrentParams(location);
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chapters/${param}`);
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
      //4.1.2. Trang web sẽ dùng phương thức POST lên server với nội dung là username của người dùng,
      // id của chương truyện đang đọc,
      // nội dung bình luận.
      const response = await axios.post(`${API_BASE_URL}/chapters/${param}`, {
        user: "User Example",
        chapterId: param,
        content: comment,
      });
      //4.1.9. phần bình luận chương truyện/sách ở giao diện được thêm vào bình luận vừa gửi.
      setComments([
        ...comments,
        response.data.chapter.comments[
          response.data.chapter.comments.length - 1
        ],
      ]);
      setComment("");
    } catch (error) {
      if (error.response) {
        //4.1.4.3. Hiển thị lên giao diện tin nhắn Không tìm thấy sách.
        toast.error(error.response.data?.message || "Lỗi từ server");
      } else if (error.request) {
        //4.1.3.1.Bình luận gửi lên máy chủ thất bại vì máy chủ sập,
        // hiển thị lên giao diện tin nhắn Không thể kết nối đến server.Có thể server đang bảo trì.
        toast.error(
          "Không thể kết nối đến server. Có thể server đang bảo trì."
        );
      } else {
        //4.1.2.1. Bình luận gửi lên máy chủ thất bại vì không có internet.
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
        {/* 4.1.1.Người dùng nhập bình luận vào vùng “Viết bình luận của bạn” và nhấn gửi bình luận. */}
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

export default ChapterDetail;
