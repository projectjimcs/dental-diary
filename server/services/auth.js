import jwt from 'jsonwebtoken';
import { 
  jwtSecret,
  environment,
} from '../config.js'

const generateToken = (res, user) => {
  const expiration = environment === 'development' ? 100 : 604800000;
  
  const jwtToken = jwt.sign({
    email: user.email,
    accountType: user.accountType,
  })
}