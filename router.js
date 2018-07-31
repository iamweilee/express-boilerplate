var indexRouter = require('./routes/index');
var exampleRouter = require('./routes/example');

module.exports = app => {
  app.use('/', indexRouter);
  app.use('/example', exampleRouter);
};