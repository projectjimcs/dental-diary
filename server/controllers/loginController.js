import User from '../models/user.js';
import bcrypt from 'bcrypt';

import {
  generateToken,
} from '../services/auth.js';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const login = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  try {
    const user = await User.query()
      .where('email', email)
      .first()
      .throwIfNotFound();

    if (user && bcrypt.compareSync(password, user.password)) {
      const jwtToken = await generateToken(user);

      const expiration = 30 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
      
      res.cookie('jwtToken', jwtToken, {
        maxAge: expiration,
        secure: false,
        httpOnly: true,
      });
  
      res.json(jwtToken);
  
      return res.end();
    } else {
      return res.send('Wrong email or password');
    }
  } catch (err) {
    console.log(err);
    console.log('User not found');
  }
}

export {
  login,
}