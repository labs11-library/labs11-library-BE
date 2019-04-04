exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("books")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("books").insert([
        {
          userId: 1,
          title: "Siddhartha",
          authors: "Hermann Hesse",
          image: "https://images.gr-assets.com/books/1428715580l/52036.jpg",
          description: "Used but good condition",
          avgRating: 4.5,
          ISBN: 1837499200,
          value: null
        },
        {
          userId: 2,
          title: "1984",
          authors: "George Orwell",
          image: "https://images.gr-assets.com/books/1532714506l/40961427.jpg",
          description: "Excellent",
          avgRating: 4.8,
          ISBN: 99103294872,
          value: null
        }
      ]);
    });
};
