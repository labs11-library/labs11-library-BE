const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

module.exports = server => {
	server.use(helmet());
	server.use(express.json());
	server.use(morgan("dev"));
	server.use(cors());
};
