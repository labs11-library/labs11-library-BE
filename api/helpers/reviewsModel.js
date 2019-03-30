const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  getReviewList
};

function getReviewList(userId) {
  const items = db("reviews")
    .join("checkedOut", "reviews.reviewEvent", "checkedOut.checkedOutId")
    .join("users as borrowers", "checkedOut.borrowerId", "borrowers.userId")
    .join("users as lenders", "checkedOut.lenderId", "lenders.userId")
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

// const items = db("reviews")
// .join("users as borrowers", "reviews.borrowerId", "borrowers.userId")
// .join("users as lenders", "reviews.lenderId", "lenders.userId")
// .select(
//   "reviews.reviewId",
//   "reviews.reviewText",
//   "reviews.rating",
//   "borrowers.userId as borrowerId",
//   "borrowers.firstName as borrowerName",
//   "lenders.userId as lenderId",
//   "lenders.firstName as lenderName"
// )
// .where("reviews.borrowerId", userId)
// .orWhere("reviews.lenderId", userId);
