import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import regeneratorRuntime from "regenerator-runtime";

import homeRouter from './routes/home.js';
import adminDashboardRouter from './routes/admin-dashboard.js';
// import companyApiRouter from './routes/api/company.js';
import mainApiRouter from './routes/api/mainRouter.js';

import {
  environment,
} from './config.js';

import knex from './database/knex.js';
import { Model } from 'objection';

Model.knex(knex);

const app = express();
const __dirname = path.resolve();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:9000', // Put this in env based on environment
  ],
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/admin-dashboard', adminDashboardRouter);
app.use('/api', mainApiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = environment === 'development' ? err : {};

  // render the error page
  res.status(err.status || 404);
  res.render('error');
});

export default app;
