const indexRouter = require('biz/index/route');
const exampleRouter = require('biz/example/route');

module.exports = app => {
  app.use('/', indexRouter);
  app.use('/example', exampleRouter);
};