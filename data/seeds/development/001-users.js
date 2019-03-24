const faker = require("faker");
const createFakeUser = () => ({
  googleId: null,
  facebookId: null,
  goodreadsId: null,
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  location: `${faker.address.latitude()},${faker.address.longitude()}`,
  picture: faker.random.image(),
  bio: faker.lorem.sentence()
});
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  let fakeUsers = [];
  for (let i = 1; i <= 90; i++) {
    fakeUsers.push(createFakeUser());
  }
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(fakeUsers);
    });
};
