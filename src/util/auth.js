const jwt = require('jsonwebtoken');
const generateToken = id => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '5d'
  });
};

module.exports = generateToken
