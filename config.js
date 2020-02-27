import dotenv from 'dotenv';
dotenv.config();

// Server setup
const environment = process.env.NODE_ENV;
const port = process.env.PORT;

export {
  environment,
  port
};