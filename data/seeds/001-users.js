exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("users").insert([
				{
					userId: 1,
					googleId: "test",
					facebookId: "test",
					goodreadsId: "test",
					email: "test@test.com",
					password: "test",
					firstName: "test",
					lastName: "test",
					location: "test",
					picture: "test",
					bio: "test"
				}
			]);
		});
};
