const SMSClient = require('@alicloud/sms-sdk')
const smsCfg = require('config').sms;
const logger = require('logger').getLogger('sms');
//初始化sms_client
let smsClient = new SMSClient(smsCfg);

/**
 * 发送注册短信
 * @param {String} mobile 手机号
 * @param {String} content 验证码
 */
exports.sendSignupCode = function (mobile, content, successCallback, errorCallback) {
  smsClient.sendSMS({
    PhoneNumbers: mobile,
    SignName: smsCfg.signName,
    TemplateCode: smsCfg.templateCode.signUp,
    TemplateParam: `{${smsCfg.param.signUp}: '${content}'}`
  })
  .then(
    function (res) {
      let { Code } = res;
      if (Code === 'OK') {
        //处理返回参数
        successCallback && successCallback('验证码已发送');
      }
      else {
        errorCallback && errorCallback(res);
      }
      logger.info('sendSignUpCode: %s', JSON.stringify(res));
    },
    function (err) {
      errorCallback && errorCallback(getError(err));
      logger.error(`sendSignUpCode: %s`, JSON.stringify(err));
    }
  );
};

/**
 * 发送重置密码短信
 * @param {String} mobile 手机号
 * @param {String} content 验证码
 */
exports.sendResetPasswordCode = function (mobile, content, successCallback, errorCallback) {
  smsClient.sendSMS({
    PhoneNumbers: mobile,
    SignName: smsCfg.signName,
    TemplateCode: smsCfg.templateCode.resetPassword,
    TemplateParam: `{${smsCfg.param.resetPassword}: '${content}'}`
  })
  .then(
    function (res) {
      let { Code } = res;
      if (Code === 'OK') {
        //处理返回参数
        successCallback && successCallback('验证码已发送');
      }
      else {
        errorCallback && errorCallback(res);
      }
      logger.info(`sendResetPasswordCode: %s`, JSON.stringify(res));
    },
    function (err) {
      errorCallback && errorCallback(getError(err));
      logger.error(`sendResetPasswordCode: %s`, JSON.stringify(err));
    }
  );
};

/**
 * 发送新密码短信
 * @param {String} mobile 手机号
 * @param {String} password 新密码
 */
exports.sendNewPassword = function (mobile, password, successCallback, errorCallback) {
  smsClient.sendSMS({
    PhoneNumbers: mobile,
    SignName: smsCfg.signName,
    TemplateCode: smsCfg.templateCode.newPassword,
    TemplateParam: `{${smsCfg.param.newPassword}: '${password}'}`
  })
  .then(
    function (res) {
      let { Code } = res;
      if (Code === 'OK') {
        //处理返回参数
        successCallback && successCallback('验证码已发送');
      }
      else {
        errorCallback && errorCallback(res);
      }
      logger.info(`sendNewPassword: %s`, JSON.stringify(res));
    },
    function (err) {
      errorCallback && errorCallback(getError(err));
      logger.error(`sendNewPassword: %s`, JSON.stringify(err));
    }
  );
};

function getError(err) {
  return {
    message: err && err.data && err.data.Message || '短信发送失败',
    code: err && err.code || err && err.data && err.data.Code
  };
}