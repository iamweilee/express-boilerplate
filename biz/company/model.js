'use strict';

import Sequelize from 'sequelize';
import db from 'db';

const { STRING, BIGINT, DOUBLE, GEOMETRY } = Sequelize;

module.exports = db.define(
  'company',
  {
    id: {
      type: BIGINT(20), // 字段类型
      allowNull: false, // 是否允许为NULL
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { // 公司名
      type: STRING(20), // 字段类型
      allowNull: false,
      unique: true,
    },
    businessLicense: { // 营业执照
      type: STRING(10), // 字段类型
      allowNull: true, // 是否允许为NULL
    },
    foundingDate: { // 成立日期
      type: STRING(10),
      allowNull: true
    },
    expiredDate: { // 营业执照到期日期
      type: STRING(10),
      allowNull: true
    },
    legalPerson: { // 法人
      type: STRING(10),
      allowNull: true
    },
    registerCapital: { // 注册资金
      type: DOUBLE,
      allowNull: true
    },
    registerAddress: { // 注册地址
      type: STRING(100),
      allowNull: true
    },
    businessAddress: { // 实际经营地址
      type: STRING(100),
      allowNull: true
    },
    latitude: {// 经度
      type: DOUBLE,
      allowNull: true
    },
    longitude: {// 纬度
      type: DOUBLE,
      allowNull: true
    },
    point: {// 经纬度转换成的空间位置
      type: GEOMETRY('POINT'),
      allowNull: true
    },
    province: { // 省
      type: STRING(50),
      allowNull: true
    },
    city: { // 市
      type: STRING(50),
      allowNull: true
    },
    district: { // 区
      type: STRING(50),
      allowNull: true
    },
    cityCode: { // 城市代码
      type: STRING(10),
      allowNull: true
    },
    streetName: { // 街道名
      type: STRING(50),
      allowNull: true
    },
    streetNumber: { // 街道门牌号
      type: STRING(10),
      allowNull: true
    },
    wechatId: { // 微信账号
      type: STRING(20),
      allowNull: true
    },
    qq: { // qq账号
      type: STRING(20),
      allowNull: true
    },
    alipayId: { // 支付宝账号
      type: STRING(20),
      allowNull: true
    },
    email: { // 邮箱
      type: STRING(30),
      allowNull: true
    },
    wechatSubscription: { // 微信公众号
      type: STRING(20),
      allowNull: true
    },
    startTime: { // 公司账户有效开始时间
      type: STRING(20),
      allowNull: false
    },
    endTime: { // 公司账户有效结束时间
      type: STRING(20),
      allowNull: false
    }
  },
  {
    // 自定义表名
    freezeTableName: true,
    tableName: 'company',
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    timestamps: false,
  }
);