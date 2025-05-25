import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  readChapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book.chapters", // Reference to chapters subdocument in Book model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;