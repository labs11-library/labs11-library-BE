const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  getCheckedOut
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
      "checkedOut.checkedOutId",
      "checkedOut.checkoutDate",
      "checkedOut.dueDate",
      "checkedOut.lenderId as lenderId",
      "lenders.firstName as lender"
    )
    .where("borrowers.userId", userId)
    .orWhere("lenders.userId", userId);

  return items;
}
