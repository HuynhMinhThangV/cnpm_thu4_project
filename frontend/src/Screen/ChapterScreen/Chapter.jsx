// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const ChapterPage = () => {
//   const { chapterId } = useParams();
//   const navigate = useNavigate();
//   const [chapter, setChapter] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchChapter = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/chapters/${chapterId}`, {
//           withCredentials: true,
//         });
//         setChapter(res.data);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           navigate("/login");
//         } else {
//           console.error("Error fetching chapter:", err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChapter();
//   }, [chapterId]);

//   if (loading)
//     return (
//       <div className="text-center mt-10 text-white">Đang tải chương...</div>
//     );
//   if (!chapter)
//     return (
//       <div className="text-center mt-10 text-white">Không tìm thấy chương.</div>
//     );

//   return (
//     <div className="bg-zinc-900 text-white min-h-screen px-4 py-6">
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-xl text-center mb-2">{chapter.bookTitle}</h2>
//         <h1 className="text-lg text-center font-semibold mb-4">
//           {chapter.title}
//         </h1>

//         <div className="flex justify-center gap-4 mb-6">
//           <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
//             Mục lục
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChapterPage = () => {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasPosted = useRef(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    hasPosted.current = false;
    const fetchChapter = async () => {
      try {
        // Lấy chương không cần withCredentials, để ai cũng xem được
        const res = await axios.get(`${API_BASE_URL}/chapters/${chapterId}`);
        setChapter(res.data);

        // Lấy danh sách các chương của truyện
        const chapterListRes = await axios.get(
          `${API_BASE_URL}/books/${res.data.bookId}`,
          {
            withCredentials: true,
          }
        );
        setChapters(chapterListRes.data.chapters || []);

        if (!hasPosted.current) {
          hasPosted.current = true; // Đảm bảo chỉ gọi một lần
          try {
            await axios.post(
              `${API_BASE_URL}/savedbooks/last-read`,
              {
                bookId: res.data.bookId,
                chapterId: res.data._id,
              },
              { withCredentials: true }
            );
          } catch (err) {
            // Nếu lỗi 401, tức chưa đăng nhập, thì bỏ qua không báo lỗi
            if (err.response?.status !== 401) {
              console.error("Lỗi cập nhật chương đang đọc:", err);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching chapter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);

  if (loading)
    return (
      <div className="text-center mt-10 text-white">Đang tải chương...</div>
    );
  if (!chapter)
    return (
      <div className="text-center mt-10 text-white">Không tìm thấy chương.</div>
    );

  return (
    <div className="bg-zinc-900 text-white min-h-screen px-4 py-6">
      {showTableOfContents && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40"></div>
          <div className="fixed top-1/2 left-1/2 z-50 w-3/4 max-h-[80%] overflow-y-auto bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mục Lục</h2>
              <button
                onClick={() => setShowTableOfContents(false)}
                className="text-red-400 hover:text-red-600"
              >
                Đóng ✕
              </button>
            </div>
            <ul className="space-y-2">
              {chapters.map((chapter) => (
                <li
                  key={chapter._id}
                  //   className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                  className={`p-2 rounded cursor-pointer ${
                    chapter._id === chapterId
                      ? "bg-gray-600"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    // window.location.href = `/chapter/${chapter._id}`;
                    setShowTableOfContents(false); // Đóng mục lục khi chọn chương
                    navigate(`/chapter/${chapter._id}`);
                  }}
                >
                  {chapter.title}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl text-center mb-2">{chapter.bookTitle}</h2>
        <h1 className="text-lg text-center font-semibold mb-4">
          {chapter.title}
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            // onClick={alert("Chức năng này đang được phát triển")}
            onClick={() => setShowTableOfContents(true)}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            Mục lục
          </button>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />
      </div>
    </div>
  );
};

export default ChapterPage;
