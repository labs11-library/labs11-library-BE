exports.up = function(knex, Promise) {
  return knex.schema.createTable("checkedOut", table => {
    table.increments("checkedOutId");
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
    table.date("checkoutDate");
    table.date("dueDate");
    table.boolean("returned");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("checkedOut");
};
