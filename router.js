const indexRoute = require('index/route');
const companyRoute = require('company/route');
const userRoute = require('user/route');
const smsRoute = require('sms/route');
const loginHistoryRoute = require('loginhistory/route');

module.exports = app => {
  app.use('/', indexRoute);
  app.use('/company', companyRoute);
  app.use('/user', userRoute);
  app.use('/sms', smsRoute);
  app.use('/loginhistory', loginHistoryRoute);
};