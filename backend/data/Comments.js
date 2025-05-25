import mongoose from "mongoose";

const commentsData = [
  {
    userId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f43"), // testuser
    content: "This chapter is really exciting!",
    chapterId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f46"),
  },
  {
    userId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f44"), // john
    content: "I love the character development here.",
    chapterId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f46"),
  },
  {
    userId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f43"),
    content: "Can't wait for the next chapter!",
    chapterId: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f46"),
  },
];

export default commentsData;
