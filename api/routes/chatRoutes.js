const config = require("../chat/config");
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { chatToken } = require("../chat/tokens");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(pino);

const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

router.get("/token", (req, res) => {
  const identity = req.query.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

router.post("/token", (req, res) => {
  const identity = req.body.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

module.exports = router;
