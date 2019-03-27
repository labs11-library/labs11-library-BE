const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = {
  generateToken
};

function generateToken(userId) {
  const payload = {
    subject: userId
    // email: user.email
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}
