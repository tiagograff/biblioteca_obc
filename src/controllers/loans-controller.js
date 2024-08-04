const HttpError = require("../errors/HttpError");
const booksModel = require("../models/books-model");
const loansModel = require("../models/loans-model");

module.exports = {
  //GET -> /api/loans
  index: (req, res) => {
    const loans = loansModel.getAllLoans();
    res.json(loans);
  },
  //GET -> /api/loans/:id
  show: (req, res) => {
    const { id } = req.params;
    const loan = loansModel.getLoansById(id);
    if (!loan) {
      res.status(404).json({ message: "empréstimo não encontrado!" });
    }
    res.json(loan);
  },
  //POST -> /api/loans
  save: (req, res) => {
    const user = req.user;
    const { bookId } = req.body;

    if (typeof bookId !== "string")
      throw new HttpError(404, "id de livro inválido");

    const book = booksModel.getBook(bookId);
    if (!book) throw new HttpError(404, "livro não encontrado");

    const newLoan = loansModel.createLoan(user, book);

    res.status(201).json(newLoan);
  },
  //POST -> /api/loans/:id/return
  return: (req, res) => {
    const { id } = req.params;
    const loan = loansModel.returnLoan(id);
    res.json(loan);
  },
};
