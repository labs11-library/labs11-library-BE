const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  getCheckedOut
};

function getCheckedOut(userId) {
  const items = db("checkedOut")
    .join("users", "checkedOut.userId", "users.userId")
    .join(
      "inventory",
      // "checkedOut.bookId",
      // "inventory.bookId",
      "checkedOut.lenderId",
      "inventory.userId"
    )
    .select(
      "users.firstName as Borrower", //firstName from Users table, person borrowing,
      "users.userId", //ID from users Table, person borrowing ID
      "inventory.bookId", //ID from inventory table, ID of the book being borrowed
      "checkedOut.checkedOutId",
      "checkedOut.checkoutDate",
      "checkedOut.dueDate",
      "checkedOut.lenderName as Lender"
    )
    .where("users.userId", userId);

  return items;
}
