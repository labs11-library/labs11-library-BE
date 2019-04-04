const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.production);

module.exports = {
  getReviewList
};

function getReviewList(userId) {
  const items = db("reviews")
    .join("checkout", "reviews.reviewEvent", "checkout.checkoutId")
    .join("users as borrowers", "checkout.borrowerId", "borrowers.userId")
    .join("users as lenders", "checkout.lenderId", "lenders.userId")
    .select(
      "reviews.reviewId",
      "reviews.rating",
      "reviews.reviewText",
      "borrowers.userId as borrowerId",
      "borrowers.firstName as borrower",
      "lenders.userId as lenderId",
      "lenders.firstName as lender"
    )
    .where("borrowers.userId", userId)
    .orWhere("lenders.userId", userId);

  return items;
}
