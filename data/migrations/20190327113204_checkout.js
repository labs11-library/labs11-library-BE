exports.up = function(knex, Promise) {
  return knex.schema.createTable("checkout", table => {
    table.increments("checkoutId");
    table
      .integer("checkoutRequestId")
      .unsigned()
      .references("checkoutRequestId")
      .inTable("checkoutRequest")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamp("checkoutDate").defaultTo(knex.fn.now());
    table.datetime("dueDate");
    table.boolean("returned").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("checkout");
};
