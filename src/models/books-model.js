const HttpError = require("../errors/HttpError");

const uuid = require("uuid").v4;

let books = [
  { id: "1", title: "book 1", author: "author 1", quantityAvailable: 4 },
  { id: "2", title: "book 2", author: "author 2", quantityAvailable: 3 },
];

module.exports = {
  getAllBooks: () =>
    books.map((book) => ({
      id: book.id,
      title: book.title,
    })),
  getBook: (id) => books.find((book) => book.id === id),
  createBook: (title, author, quantityAvailable) => {
    const newBook = {
      id: uuid(),
      title,
      author,
      quantityAvailable,
    };
    books.push(newBook);
    return newBook;
  },
  updateBook: (id, updatedBook) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1)
      throw new HttpError(404, "Livro não encontrado no sistema!");
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    return books[bookIndex];
  },
  deleteBook: (id) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1)
      throw new HttpError(404, "Livro não encontra no sistema!");
    const deletedBook = books[bookIndex];
    books = books.filter((book) => book.id !== id);
    return deletedBook;
  },
};
