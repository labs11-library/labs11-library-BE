exports.up = function(knex, Promise) {
  return knex.schema.createTable("books", table => {
    table.increments("bookId");
    table
      .integer("userId")
      .unsigned()
      .references("userId")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("title");
    table.string("authors");
    table.string("image");
    table.integer("ISBN");
    table.float("avgRating");
    table.text("description");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("books");
};
