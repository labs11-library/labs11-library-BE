exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("reviews").insert([
        { reviewEvent: 1, reviewText: "great lender!", rating: 5 },
        { reviewEvent: 2, reviewText: "ty dood!", rating: 4 }
      ]);
    });
};
