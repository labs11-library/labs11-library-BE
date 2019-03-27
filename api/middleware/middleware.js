const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("dev"));
  server.use(cors({
    credentials: true,
    origin: ['https://bookmaps.netlify.com', 'http://localhost:3000'],
    AccessControlAllowOrigin: ['https://book-maps.heroku.com', 'http://localhost:9001']
  }));
};
