import dotenv from 'dotenv';
dotenv.config();

// Server setup
const environment = process.env.NODE_ENV;
const port = process.env.PORT;

// Tokens
const jwtSecret = process.env.JWT_SECRET;

export {
  environment,
  port,
  jwtSecret,
};