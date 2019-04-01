// const knex = require("knex");
// const knexConfig = require("../../knexfile");

// const db = knex(knexConfig.production);

// module.exports = {
//   getInventoryList
// };

// function getInventoryList(userId) {
//   const books = db("checkedOut")
//   .join("books", "books.userId", "checkedOut.lenderId")
//   .select(
//     "checkedOut.bo"
//   )
//   .where("books.available", "=", "true")
//   .orWhere("books.userId", userId)
// }
