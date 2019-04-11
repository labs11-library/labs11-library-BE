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
    .join("checkouts", "books.bookId", "checkouts.bookId")
    .select(
      "books.bookId as bookId",
      "lenders.firstName as lender",
      "lenders.userId as lenderId",
      "lenders.latitude as latitude",
      "lenders.latitude as longitude",
      "lenders.email as lenderEmail",
      "books.title",
      "books.authors",
      "books.image",
      "books.ISBN",
      "books.avgRating",
      "books.description",
      "books.available",
      "books.value"
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
      "lenders.latitude as longitude",
      "lenders.email as lenderEmail",
      "books.bookId as bookId",
      "books.title",
      "books.authors",
      "books.image",
      "books.ISBN",
      "books.avgRating",
      "books.description",
      "books.available",
      "books.value"
    )
    .where("books.bookId", bookId);

  return books;
}
