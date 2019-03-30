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
          image: "thisImageWillBeProvidedByGoodreadsAPI.com",
          description: "Used but good condition",
          avgRating: 4.5,
          ISBN: 1837499200
        },
        {
          userId: 2,
          title: "1984",
          authors: "George Orwell",
          image: "thisImageWillBeProvidedByGoodreadsAPI.com",
          description: "Excellent",
          avgRating: 4.8,
          ISBN: 99103294872
        }
      ]);
    });
};
