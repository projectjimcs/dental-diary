import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js'

const generateToken = (user) => {
  const payload = {
    email: user.email,
    accountType: user.accountType,
  };

  const jwtToken = jwt.sign(payload, jwtSecret, {
    expiresIn: 900
  });

  return jwtToken;
}

const verifyToken = (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    return res.status(401).end();
  }

  jwt.verify(jwtToken, jwtSecret, (err, userData) => {
    if (err) {
      return res.status('403').end();
    }

    req.user = userData;
    next();
  });
}

export {
  generateToken,
  verifyToken,
};