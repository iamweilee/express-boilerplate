'use strict';

import Sequelize from 'sequelize';
import db from 'db';
import CompanyModel from 'company/model';

const { STRING, BIGINT, INTEGER } = Sequelize;

const Model = db.define(
  'user',
  {
    id: {
      type: BIGINT(20), // 字段类型
      allowNull: false, // 是否允许为NULL
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    mobile: { // 手机号
      type: STRING(11), // 字段类型
      allowNull: false,
      unique: true,
    },
    userName: { // 用户名
      type: STRING(10), // 字段类型
      allowNull: true, // 是否允许为NULL
    },
    nickName: { // 昵称
      type: STRING(20),
      allowNull: true
    },
    email: { // 邮箱
      type: STRING(20),
      allowNull: true
    },
    companyId: { // 公司id
      type: BIGINT(20),
      allowNull: false
    },
    password: { // 密码
      type: STRING(100),
      allowNull: false
    },
    role: { // 角色: 1 平台管理员 2 企业管理者
      type: INTEGER(1),
      allowNull: false
    },
    lastLoginIp: { // 最后登录的ip
      type: STRING(20),
      allowNull: true
    },
    lastLoginTime: { // 最后登录的时间
      type: STRING(20),
      allowNull: true
    }
  },
  {
    // 自定义表名
    freezeTableName: true,
    tableName: 'user',
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    timestamps: false,
  }
);

Model.belongsTo(CompanyModel, { foreignKey: 'companyId', targetKey: 'id' });

module.exports = Model;