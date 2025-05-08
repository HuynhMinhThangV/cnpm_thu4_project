import Book from "../models/bookmodel.js";

const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
  }
};
export { getBooks, getBook };
