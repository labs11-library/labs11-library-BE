const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.production);

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
    .join(
      "users as borrowers",
      "checkoutRequest.borrowerId",
      "borrowers.userId"
    )
    .join("books", "checkoutRequest.bookId", "books.bookId")
    .select(
      "checkoutId",
      "checkoutRequest.checkoutRequestId",
      "borrowers.firstName as borrower",
      "borrowers.email as borrowerEmail",
      "checkoutRequest.borrowerId",
      "lenders.firstName as lender",
      "lenders.email as lenderEmail",
      "checkoutRequest.lenderId",
      "books.bookId",
      "books.title",
      "books.authors",
      "books.description",
      "books.image",
      "books.value",
      "books.avgRating",
      "checkout.checkoutDate",
      "checkout.dueDate",
      "checkout.returned",
      "checkout.returnedDate",
      "checkout.overdue",
      "checkout.lateFee",
      "borrowers.stripe_cust_id"
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
    .join(
      "users as borrowers",
      "checkoutRequest.borrowerId",
      "borrowers.userId"
    )
    .join("books", "checkoutRequest.bookId", "books.bookId")
    .select(
      "checkoutId",
      "checkoutRequest.checkoutRequestId",
      "borrowers.firstName as borrower",
      "borrowers.email as borrowerEmail",
      "checkoutRequest.borrowerId",
      "lenders.firstName as lender",
      "lenders.email as lenderEmail",
      "checkoutRequest.lenderId",
      "books.bookId",
      "books.title",
      "books.authors",
      "books.description",
      "books.image",
      "books.value",
      "checkout.checkoutDate",
      "checkout.dueDate",
      "checkout.returned",
      "checkout.returnedDate",
      "checkout.overdue",
      "checkout.lateFee",
      "borrowers.stripe_cust_id"
    )
    .where("checkout.checkoutId", checkoutId)
    .first();

  return item;
}
