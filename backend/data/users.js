import mongoose from "mongoose";

const userData = [
  {
    _id: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f43"),
    username: "testuser",
    email: "test@example.com",
    password: "123456",
  },
  {
    _id: new mongoose.Types.ObjectId("6831f24b567778fe7f1c1f44"),
    username: "john",
    email: "john@example.com",
    password: "password",
  },
];

export default userData;
