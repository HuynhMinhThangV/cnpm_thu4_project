// backend/controllers/auth.js
import User from "../models/userModel.js"; // đường dẫn tùy dự án

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // So sánh mật khẩu (demo không mã hóa)
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Nếu đúng, trả về thành công (có thể set cookie/session ở đây)
    res.json({ message: "Đăng nhập thành công", userId: user._id });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
