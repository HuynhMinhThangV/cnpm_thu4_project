// be/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // chưa cần mã hóa nếu demo đơn giản
});

export default mongoose.model("User", userSchema);
