exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments("userId");
    table.string("googleId");
    table.string("facebookId");
    table.string("goodreadsId");
    table.string("email").unique();
    table.string("password");
    table.string("firstName");
    table.string("lastName");
    table.string("latitude");
    table.string("longitude");
    table.string("picture");
    table.text("bio", 140);
    table.string("token");
    table.string("stripeToken");
    table.float("amount");
    table.string("stripe_email");
    table.string("stripe_cust_id");
    table.string("stripe_card_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
