require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("dev"));
  server.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://bookmaps.netlify.com"
      ],
      AccessControlAllowOrigin: [
        "http://localhost:9001",
        "https://book-maps.herokuapp.com"
      ],
      AccessControlAllowHeaders: "Authorization"
    })
  );
};
