const { sendSignupCode, sendResetPasswordCode, sendNewPassword } = require('./service');
const { toNextRouter } = require('utils/helper');

exports.sendSignupCode = function(req, res, next) {
  sendSignupCode(
    req.body.mobile,
    req.body.code,
    function(data) {
      storeSmsInfo(req.session, 'signup', req.body.code);
      toNextRouter(res, next, data);
    },
    function(err) {
      toNextRouter(res, next, err);
    }
  );
};

exports.sendResetPasswordCode = function(req, res, next) {
  sendResetPasswordCode(
    req.body.mobile,
    req.body.code,
    function(data) {
      storeSmsInfo(req.session, 'resetpassword', req.body.code);
      toNextRouter(res, next, data);
    },
    function(err) {
      toNextRouter(res, next, err);
    }
  );
};

exports.sendNewPassword = function(req, res, next) {
  sendNewPassword(
    req.body.mobile,
    req.body.password,
    function(data) {
      storeSmsInfo(req.session, 'newpassword', req.body.password);
      toNextRouter(res, next, data);
    },
    function(err) {
      toNextRouter(res, next, err);
    }
  );
};

function storeSmsInfo(session, storeKey, code) {
  if (!session.sms) {
    session.sms = {};
  }
  session.sms[storeKey] = {
    code,
    lastSmsTime: Date.now()
  };
}

function getSmsInfo(session, storeKey) {
  return session[storeKey];
}