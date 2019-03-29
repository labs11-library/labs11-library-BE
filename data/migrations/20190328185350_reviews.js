exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
    table.increments("reviewId");
    table
      .integer("reviewEvent")
      .unsigned()
      .references("checkedOutId")
      .inTable("checkedOut")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
