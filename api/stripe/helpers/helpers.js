const db = require("../../../data/dbConfig");
const findBy = (tbl, filter) =>
	db(tbl)
		.where(filter)
		.first();
const update = (tbl, id, item) =>
	db(tbl)
		.where({ id })
		.update(item);
module.exports = {
	findBy,
	update
};
