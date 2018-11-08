const indexRouter = require('index/route');
const exampleRouter = require('example/route');

module.exports = app => {
  app.use('/', indexRouter);
  app.use('/example', exampleRouter);
};