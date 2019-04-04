const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.production);

const updateStripe = (filter, item) =>
  db(tbl)
    .where(filter)
    .update(item);

module.exports = {
  updateStripe
};
