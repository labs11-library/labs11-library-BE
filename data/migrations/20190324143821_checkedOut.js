exports.up = function(knex, Promise) {
  return knex.schema.createTable("checkedOut", table => {
    table.increments("checkedOutId");
    table
      .integer("userId") // ID of person checking book out
      .unsigned()
      .references("userId")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("lenderId") // ID of person loaning book out
      .unsigned()
      .references("userId")
      .inTable("inventory")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("bookId")
      .unsigned()
      .references("bookId")
      .inTable("inventory")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .string("lenderName")
      .unsigned()
      .references("firstName")
      .inTable("inventory")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.date("checkoutDate");
    table.date("dueDate");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("checkedOut");
};
