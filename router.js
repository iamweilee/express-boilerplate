const indexRouter = require('./routes/index');
const exampleRouter = require('./routes/example');

module.exports = app => {
  app.use('/', indexRouter);
  app.use('/example', exampleRouter);
};