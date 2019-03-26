// var app = require('http').createServer();
const server = require("../server.js");
var io = (module.exports.io = require("socket.io")(server));

const SocketManager = require("./socketManager");
io.on("connection", SocketManager);
