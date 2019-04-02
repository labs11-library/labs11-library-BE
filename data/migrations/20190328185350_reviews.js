exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
    table.increments("reviewId");
    table.text("reviewText");
    table.integer("rating");
    table
      .integer("reviewEvent")
      .unsigned()
      .references("checkoutId")
      .inTable("checkout")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
