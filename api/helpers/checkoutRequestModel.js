const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.production);

module.exports = {
  getCheckoutRequests,
  getCheckoutRequestById
};

function getCheckoutRequests(userId) {
  const items = db("checkoutRequest")
    .join(
      "users as borrowers",
      "checkoutRequest.borrowerId",
      "borrowers.userId"
    )
    .join("users as lenders", "checkoutRequest.lenderId", "lenders.userId")
    .join("books", "checkoutRequest.bookId", "books.bookId")
    .select(
      "checkoutRequest.checkoutRequestId",
      "borrowers.firstName as borrower",
      "checkoutRequest.borrowerId",
      "lenders.firstName as lender",
      "checkoutRequest.lenderId",
      "books.bookId",
      "books.title",
      "books.authors",
      "books.description",
      "books.image",
      "books.value",
      "checkoutRequest.checkoutAccepted"
    )
    .where("borrowers.userId", userId)
    .orWhere("lenders.userId", userId);

  return items;
}
//pls work
function getCheckoutRequestById(checkoutRequestId) {
  const items = db("checkoutRequest")
    .join(
      "users as borrowers",
      "checkoutRequest.borrowerId",
      "borrowers.userId"
    )
    .join("users as lenders", "checkoutRequest.lenderId", "lenders.userId")
    .join("books", "checkoutRequest.bookId", "books.bookId")
    .select(
      "checkoutRequest.checkoutRequestId",
      "borrowers.firstName as borrower",
      "checkoutRequest.borrowerId",
      "lenders.firstName as lender",
      "checkoutRequest.lenderId",
      "books.bookId",
      "books.title",
      "books.authors",
      "books.description",
      "books.image",
      "books.value",
      "checkoutRequest.checkoutAccepted"
    )
    .where("checkoutRequest.checkoutRequestId", checkoutRequestId)
    .first();

  return items;
}
