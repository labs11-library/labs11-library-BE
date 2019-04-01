const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  getCheckedOut,
  getCheckedOutById,
  getBookById,
  getAllBooks
};

function getCheckedOut(userId) {
  const items = db("checkedOut")
    .join("users as borrowers", "checkedOut.borrowerId", "borrowers.userId")
    .join("users as lenders", "checkedOut.lenderId", "lenders.userId")
    .join(
      "books",
      // "checkedOut.bookId",
      // "inventory.bookId",
      "checkedOut.bookId",
      "books.bookId"
    )
    .select(
      "borrowers.firstName as borrower", //firstName from Users table, person borrowing,
      "checkedOut.borrowerId as borrowerId", //ID from users Table, person borrowing ID
      "books.bookId", //ID from inventory table, ID of the book being borrowed
      "books.title",
      "books.authors",
      "books.description",
      "books.image",
      "checkedOut.checkedOutId",
      "checkedOut.checkoutDate",
      "checkedOut.dueDate",
      "checkedOut.returned",
      "checkedOut.lenderId as lenderId",
      "lenders.firstName as lender"
    )
    .where("borrowers.userId", userId)
    .orWhere("lenders.userId", userId);

  return items;
}

function getCheckedOutById(checkedOutId) {
  const items = db("checkedOut")
    .join("users as borrowers", "checkedOut.borrowerId", "borrowers.userId")
    .join("users as lenders", "checkedOut.lenderId", "lenders.userId")
    .join("books", "checkedOut.bookId", "books.bookId")
    .select(
      "borrowers.firstName as borrower", //firstName from Users table, person borrowing,
      "checkedOut.borrowerId as borrowerId", //ID from users Table, person borrowing ID
      "books.bookId", //ID from inventory table, ID of the book being borrowed
      "books.title",
      "books.authors",
      "books.description",
      "books.image",
      "checkedOut.checkedOutId",
      "checkedOut.checkoutDate",
      "checkedOut.dueDate",
      "checkedOut.returned",
      "checkedOut.lenderId as lenderId",
      "lenders.firstName as lender"
    )
    .where("checkedOut.checkedOutId", checkedOutId)
    .first();

  return items;
}

function getAllBooks() {
  const books = db("books")
    // .join("users as lenders", "books.userId", "lenders.userId")
    .select(
      "books.bookId as bookId",
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
      "books.bookId as bookId",
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
