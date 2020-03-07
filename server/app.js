import createError from 'http-errors';
import express from 'express';
import path from 'path';
import session from 'express-session';
import logger from 'morgan';

import homeRouter from './routes/home.js';

import {
  environment,
} from './config.js';

const app = express();
const __dirname = path.resolve();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);

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
