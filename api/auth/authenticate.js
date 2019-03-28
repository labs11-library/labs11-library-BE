const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

module.exports = {
  authenticate
};

function authenticate(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "didn't work for some reason" });

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization Header"
    });
  }
}
