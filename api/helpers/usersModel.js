const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.production);

const updateStripe = (filter, item, table) =>
  db(table)
    .where(filter)
    .update(item);

module.exports = {
  updateStripe
};
