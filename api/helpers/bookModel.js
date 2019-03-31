const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  getBookById,
  getAllBooks
};

function getAllBooks() {
  const books = db("books")
    .join("users as lenders", "books.userId", "lenders.userId")
    .select(
      "lenders.firstName as lender",
      "lenders.userId as lenderId",
      "lenders.latitude as latitude",
      "lenders.latitude as longitude",
      "books.title",
      "books.authors",
      "books.image",
      "books.isbn",
      "books.avgRating",
      "books.description",
      "books.available",
      "books.checkOutRequest"
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
      "books.title",
      "books.authors",
      "books.image",
      "books.isbn",
      "books.avgRating",
      "books.description",
      "books.available",
      "books.checkOutRequest"
    )
    .where("books.bookId", bookId);

  return books;
}
