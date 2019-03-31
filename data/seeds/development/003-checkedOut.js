exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("checkedOut")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("checkedOut").insert([
        { bookId: 1, lenderId: 1, borrowerId: 2, returned: false },
        { bookId: 2, lenderId: 2, borrowerId: 1, returned: false }
      ]);
    });
};
