'use strict';

const { findAll, create, findById, findOne, update } = require('user/service').instance;
const { toNextRouter, encodePassword, createError, getClientIp } = require('utils/helper');
const { maxInterval } = require('config').sms;
import { UserRole } from 'enum';
import moment from 'moment';


exports.index = function(req, res, next) {
  let result = { title: 'Express' };
  toNextRouter(res, next, result);
};

exports.signup = async(req, res, next) => {
  let sms = req.session.sms && req.session.sms.signup;

  if (!sms) {
    return toNextRouter(res, next, createError('请先校验短信验证码'));
  }

  if (Date.now() - sms.lastSmsTime > maxInterval) {
    return toNextRouter(res, next, createError('验证码已过期'));
  }

  if (sms.code !== req.body.code) {
    return toNextRouter(res, next, createError('验证码错误'));
  }

  let userName = req.body.userName;
  let password = req.body.password;
  let mobile = req.body.mobile;
  let companyId = Number(req.body.companyId);
  let role = req.body.role;
  role = UserRole[role]
  password = encodePassword(password);

  let result = await create({ userName, password, companyId, mobile, role });
  toNextRouter(res, next, result);
};

exports.findById = async (req, res, next) => {
  let id = req.params.id;
  let result = await findById(id, { attributes: { exclude: ['password'] } });
  toNextRouter(res, next, result);
};

exports.signin = async (req, res, next) => {
  let accountId = req.body.accountId;

  let result = await findOne({
    where: {
      $or: [ // 手机号、用户名、邮箱 三者其一即可
        { mobile: accountId },
        { userName: accountId },
        { email: accountId },
      ]
    }
  });

  if (result) {
    let password = req.body.password;
    password = encodePassword(password);
    if (result.password === password) {
      let ip = getClientIp(req);
      result.set('lastLoginIp', ip);
      result.set('lastLoginTime', moment().format('YYYY/MM/DD HH:mm:ss'));
      await result.save();
      // await update({lastLoginIp: ip, lastLoginTime: moment().format('YYYY/MM/DD HH:mm:ss')}, { where: { id: result.id }});
      result = result.get({ plain: true });
      delete result.password;

      let roleItem = UserRole.fromValue(result.role);
      result.functionList = roleItem.functionList;
      req.session.user = result;
      return toNextRouter(res, next, result);
    }
  }

  toNextRouter(res, next, createError('账号或密码错误'));
};

exports.signout = async (req, res, next) => {
  delete req.session.user;
  delete req.session.sms;
  toNextRouter(res, next, '登出成功');
};

// exports.baseInfo = async (req, res, next) => {
//   let baseInfo, user = req.session.user;
//   if (user) {
//     baseInfo = { accountInfo: user, functionList: user.functionList.map(item => ({ enName: item })) };
//   }

//   res.json(buildDataRsp(baseInfo));
// };

exports.getSession = async (req, res, next) => {
  toNextRouter(res, next, req.session.user);
};