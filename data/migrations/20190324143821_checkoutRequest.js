exports.up = function(knex, Promise) {
  let date = new Date();
  return knex.schema.createTable("checkoutRequest", table => {
    table.increments("checkoutRequestId");
    table
      .integer("borrowerId") // ID of person checking book out
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
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("checkoutRequest");
};
