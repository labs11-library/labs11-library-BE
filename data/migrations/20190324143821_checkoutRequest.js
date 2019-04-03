exports.up = function(knex, Promise) {
  return knex.schema.createTable("checkoutRequest", table => {
    table.increments("checkoutRequestId");
    table
      .integer("borrowerId")
      .unsigned()
      .references("userId")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("lenderId")
      .unsigned()
      .references("userId")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("bookId")
      .unsigned()
      .references("bookId")
      .inTable("books")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.bool("checkoutAccepted").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("checkoutRequest");
};
