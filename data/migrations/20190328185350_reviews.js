exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
    table.increments("reviewId");
    table.text("reviewText");
    table.integer("rating");
    table
      .integer("reviewEvent")
      .unsigned()
      .references("checkedOutId")
      .inTable("checkedOut")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    // table
    //   .integer("borrowerId")
    //   .unsigned()
    //   .references("userId")
    //   .inTable("users")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");
    // table
    //   .integer("lenderId")
    //   .unsigned()
    //   .references("userId")
    //   .inTable("users")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
