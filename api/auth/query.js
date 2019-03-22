const knex = require("../../data/dbConfig");

module.exports = {
  findUserByGoogleId: profileId => {
    return knex("users")
      .select()
      .where({ googleId: profileId })
      .first();
  },

  getUsers: () => {
    return knex("users");
  }
};
