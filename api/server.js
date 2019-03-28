const express = require("express");
const config = require("./middleware/middleware.js");
const server = express();
const db = require("../data/dbConfig");
const passport = require("passport");
const uuid = require("uuidv4");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const secret = process.env.SECRET;

config(server);

server.use(passport.initialize());
server.use(passport.session());

// const sessionConfig = {
//   secret,
//   resave: false,
//   genid: function(req) {
//     return uuid();
//   },
//   saveUninitialized: true,
//   cookie: { maxAge: 1000 * 60 }, //24 * 1000 * 60 * 60
//   store: new KnexSessionStore({
//     tablename: "sessions",
//     sidfieldname: "sid",
//     knex: db,
//     clearInterval: 1000 * 60, // 1000 * 60 * 60
//     createtable: true
//   })
// };

// server.use(session(sessionConfig));

// Routes

const auth = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const emailRoutes = require("./sendgrid/Sendgrid");
// const paymentRoutes = require("./routes/paymentRoute");

server.use("/auth", auth);
server.use("/users", userRoutes);
server.use("/books", bookRoutes);
server.use("/chat", chatRoutes);
server.use("/", emailRoutes);
// server.use("/payment", paymentRoutes);

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
