const knex = require("../../data/dbConfig");

module.exports = {
  findUserByGoogleId: profileId => {
    return knex("users")
      .select()
      .where({ googleId: profileId })
      .first();
  },
  findUserByFacebookId: profileId => {
    return knex("users")
      .select()
      .where({ facebookId: profileId })
      .first();
  },

  getUsers: () => {
    return knex("users");
  }
};
