exports.up = function(knex, Promise) {
  return knex.schema.createTable("books", table => {
    table.increments("bookId");
    table.string("title");
    table.string("authors");
    table.integer("ISBN");
    table.float("avgRating");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("books");
};
