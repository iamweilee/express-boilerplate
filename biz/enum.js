import Enum from 'utils/Enum';

const baseFuncList = [
  'ACCOUNT_LIST', 'ACCOUNT_DETAIL', 'ACCOUNT_ADD'
];

export const UserRole = new Enum(
  { alias: 'ADMIN_PLATFORM', text: '平台管理员', value: 1, functionList: ['ACCOUNT', 'COMPANY'] },
  { alias: 'ADMIN_COMPANY', text: '企业管理者', value: 2, functionList: baseFuncList },
);

export const ReceiverType = new Enum(
  { alias: 'WECHAT', text: '微信', value: 1 },
  { alias: 'QQ', text: 'QQ', value: 2 },
  { alias: 'ALIPAY', text: '支付宝', value: 3 },
  { alias: 'EMAIL', text: '电子邮箱', value: 4 },
  { alias: 'MOBILE', text: '手机短信', value: 5 },
);


