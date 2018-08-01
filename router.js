const indexRouter = require('./modules/index/route');
const exampleRouter = require('./modules/example/route');

module.exports = app => {
  app.use('/', indexRouter);
  app.use('/example', exampleRouter);
};