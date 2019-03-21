
const knex = require("../../data/dbConfig");

module.exports = {

  findUserByGoogleId: (profileId) => {
    return knex('users').select().where({ googleId: profileId }).first();
  },

  createUserWithGoogleId: (profileId) => {
    return knex('users').insert({ googleId: profileId });
  }
};