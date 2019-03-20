const express = require("express");

const server = express();
const db = require("../data/dbConfig");

server.get("/", (req, res) => {
	res.status(200).json({ api: "running" });
});

server.get("/users", async (req, res) => {
	try {
		const users = await db("users").orderBy("userId");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "no users displayed!" });
	}
});

module.exports = server;
