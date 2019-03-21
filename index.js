require("dotenv").config();

const passportConfig = require('./api/auth/passportConfig');

const server = require("./api/server");

const port = process.env.PORT || 9001;
server.listen(port, () => console.log(`\n** ☁️📚🤓☁️ ${port} **\n`));
