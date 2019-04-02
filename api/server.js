const express = require("express");
const config = require("./middleware/middleware.js");
const server = express();
const db = require("../data/dbConfig");
const passport = require("passport");
const secret = process.env.SECRET;

config(server);

server.use(passport.initialize());
server.use(passport.session());

// Routes

const auth = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const checkoutRequestRoutes = require("./routes/checkoutRequestRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const chatRoutes = require("./routes/chatRoutes");
const emailRoutes = require("./sendgrid/Sendgrid");
const paymentRoutes = require("./routes/paymentRoute");

server.use("/payment", paymentRoutes);
server.use("/auth", auth);
server.use("/users", userRoutes);
server.use("/users", inventoryRoutes);
server.use("/users", checkoutRequestRoutes);
server.use("/users", checkoutRoutes);
server.use("/books", bookRoutes);
server.use("/chat", chatRoutes);
server.use("/", emailRoutes);

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
