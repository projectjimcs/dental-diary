import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js'

const testUsers = [
  {
    email: 'testadmin@example.com',
    password: 'testadmin!23',
    accountType: 'admin',
  },
  {
    email: 'testuser@example.com',
    password: 'testuser!23',
    accountType: 'member',
  }
];

const login = (req,res) => {
  console.log(req.body);
  const {
    email,
    password,
  } = req.body;

  const user = testUsers.find((user) => {
    return user.email === email && user.password === password;
  });

  if (user) {
    const userAccessToken = jwt.sign({
      email: user.email,
      accountType: user.accountType,
    }, jwtSecret);

    return res.json({
      userAccessToken
    });
  }

  return res.send('No user found');
}

export {
  login,
}