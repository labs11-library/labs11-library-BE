const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = {
  generateToken
};

function generateToken(email) {
  const payload = {
    subject: email
    // email: user.email
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}
