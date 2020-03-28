import dotenv from 'dotenv';
dotenv.config();

// Server setup
const environment = process.env.NODE_ENV;
const port = process.env.PORT;

// Tokens
const jwtSecret = process.env.JWT_SECRET;

// Database 
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPort = process.env.DB_PORT;
const dbPassword = process.env.DB_PASSWORD;

export {
  environment,
  port,
  jwtSecret,
  dbName,
  dbUser,
  dbPort,
  dbPassword,
};