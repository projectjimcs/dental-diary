import {
  generateToken,
} from '../services/auth.js';

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

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const login = (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const user = testUsers.find((user) => {
    return user.email === email && user.password === password;
  });

  if (user) {
    const jwtToken = generateToken(user);

    const expiration = 15 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
    
    res.cookie('jwtToken', jwtToken, {
      maxAge: expiration,
      secure: false,
      httpOnly: true,
    });

    res.json(jwtToken);

    return res.end();
  }

  return res.send('No user found');
}

export {
  login,
}