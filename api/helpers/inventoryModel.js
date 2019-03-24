const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  getInventory
};

function getInventory(userId) {
  const items = db("inventory")
    .join("users", "inventory.userId", "users.userId")
    .join("books", "inventory.bookId", "books.bookId")
    .select(
      "users.firstName",
      "users.userId",
      "inventory.inventoryId",
      "inventory.bookId",
      "inventory.available"
    )
    .where("users.userId", userId);

  return items;
}
