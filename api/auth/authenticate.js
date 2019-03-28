const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage");

const SECRET = process.env.JWT_SECRET;

module.exports = {
  authenticate
};

function authenticate(req, res, next) {
  console.log(res);
  let token = res;
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}
