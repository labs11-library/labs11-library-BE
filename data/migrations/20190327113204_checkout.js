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
    table.boolean("overdue");
    table.boolean("returned").defaultTo(false);
    table.datetime("returnedDate");
    table.float("lateFee");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("checkout");
};
