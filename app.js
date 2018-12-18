'use strict';

// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('logger');
const { buildDataRsp, buildErrorRsp, createError } = require('utils/helper');
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger.connect('access'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.locals.app = require('config').app;

app.disable('x-powered-by');

app.use(require('./middlewares/session'));
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('会话丢失')); // handle error
  }
  next(); // otherwise continue
});

require('./router')(app);

app.use(function(req, res, next) {
  if (!res.locals.uriMatched) {
    return next();
  }
  let result = res.locals.result;
  return res.json(result instanceof Error ? buildErrorRsp(result) : buildDataRsp(result));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'API NOT FOUND'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(buildErrorRsp(err));
});

module.exports = app;
