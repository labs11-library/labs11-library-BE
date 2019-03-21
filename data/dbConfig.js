require("dotenv").config();

const knex = require("knex");
const config = require("../knexfile");

// const dbEnv = process.env.DB_ENV || "development";

// module.exports = knex(config[dbEnv]);
const environment = process.env.ENVIRONMENT || "development";

module.exports = knex(config[environment]);
