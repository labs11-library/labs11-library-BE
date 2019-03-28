require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");

// module.exports = server => {
//   server.use(helmet());
//   server.use(express.json());
//   server.use(
//     cookieSession({
//       name: "bookmaps",
//       keys: [process.env.COOKIE_KEY],
//       maxAge: 60 * 60 * 1000
//     })
//   );
//   server.use(morgan("dev"));
// server.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000", "https://bookmaps.netlify.com"],
//     AccessControlAllowOrigin: [
//       "http://localhost:9001",
//       "https://book-maps.heroku.com"
//     ]
//   })
// );
// };

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("dev"));
  server.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://bookmaps.netlify.com"],
      AccessControlAllowOrigin: [
        "http://localhost:9001",
        "https://book-maps.heroku.com"
      ],
      AccessControlAllowHeaders: "Authorization"
    })
  );
};
