require("dotenv").config();
const passport = require('passport');

const passportConfig = require('./api/auth/passportConfig');

const server = require("./api/server");

server.use(passport.initialize());
server.use(passport.session());

const port = process.env.PORT || 9001;
server.listen(port, () => console.log(`\n** ☁️📚🤓☁️ ${port} **\n`));