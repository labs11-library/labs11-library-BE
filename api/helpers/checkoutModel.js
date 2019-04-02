const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  getCheckout,
  getCheckoutById
};

function getCheckout(userId) {
  const items = db("checkout")
    .join(
      "checkoutRequest",
      "checkout.checkoutRequestId",
      "checkoutRequest.checkoutRequestId"
    )
    .join("users as lenders", "checkoutRequest.lenderId", "lenders.userId")
    .join("users as borrowers", "checkoutRequest.lenderId", "borrowers.userId")
    .join("books", "checkoutRequest.bookId", "books.bookId")
    .select(
      "checkoutId",
      "checkoutRequest.checkoutRequestId",
      "borrowers.firstName as borrower",
      "checkoutRequest.borrowerId",
      "lenders.firstName as lender",
      "checkoutRequest.lenderId",
      "books.bookId",
      "books.title",
      "checkout.checkoutDate",
      "checkout.dueDate",
      "checkout.returned"
    )
    .where("checkoutRequest.borrowerId", userId)
    .orWhere("checkoutRequest.lenderId", userId);

  return items;
}

function getCheckoutById(checkoutId) {
  const item = db("checkout")
    .join(
      "checkoutRequest",
      "checkout.checkoutRequestId",
      "checkoutRequest.checkoutRequestId"
    )
    .join("users as lenders", "checkoutRequest.lenderId", "lenders.userId")
    .join("users as borrowers", "checkoutRequest.lenderId", "borrowers.userId")
    .join("books", "checkoutRequest.bookId", "books.bookId")
    .select(
      "checkoutId",
      "checkoutRequest.checkoutRequestId",
      "borrowers.firstName as borrower",
      "checkoutRequest.borrowerId",
      "lenders.firstName as lender",
      "checkoutRequest.lenderId",
      "books.bookId",
      "books.title",
      "checkout.checkoutDate",
      "checkout.dueDate",
      "checkout.returned"
    )
    .where("checkout.checkoutId", checkoutId)
    .first();

  return item;
}
