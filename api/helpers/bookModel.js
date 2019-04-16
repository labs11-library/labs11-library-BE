const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.production);

module.exports = {
  getBookById,
  getAllBooks
};

function getAllBooks() {
  const books = db("books")
    .join("users as lenders", "books.userId", "lenders.userId")
    .select(
      "books.bookId as bookId",
      "lenders.firstName as lender",
      "lenders.userId as lenderId",
      "lenders.latitude as latitude",
      "lenders.longitude as longitude",
      "lenders.email as lenderEmail",
      "lenders.picture as lenderPicture",
      "books.title",
      "books.authors",
      "books.image",
      "books.ISBN",
      "books.avgRating",
      "books.description",
      "books.available",
      "books.value",
      "books.dueDate"
    );
  return books;
}

function getBookById(bookId) {
  const books = db("books")
    .join("users as lenders", "books.userId", "lenders.userId")
    .select(
      "lenders.firstName as lender",
      "lenders.userId as lenderId",
      "lenders.latitude as latitude",
      "lenders.longitude as longitude",
      "lenders.email as lenderEmail",
      "lenders.picture as lenderPicture",
      "books.bookId as bookId",
      "books.title",
      "books.authors",
      "books.image",
      "books.ISBN",
      "books.avgRating",
      "books.description",
      "books.available",
      "books.value",
      "books.dueDate"
    )
    .where("books.bookId", bookId);

  return books;
}
