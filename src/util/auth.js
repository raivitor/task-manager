const jwt = require('jsonwebtoken');
export const generateToken = id => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '5d'
  });
};
