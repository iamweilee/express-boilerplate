// 该模块用于创建表
'use strict';

require('babel-register');

const { parsedWithBlank, parsedWithEqual } = require('../utils/args');

let args = parsedWithEqual();
let tableName = args.name;

if (!tableName) {
  console.error('Please input table name with "name=table_name".');
  return;
}


let Model = require(`../biz/${tableName}/model`);
Model = Model.default || Model;

if (!Model) {
  console.error(`Model of table "${tableName}" not found.`);
  return;
}

(async function() {
  let result = await Model.sync({force: false}); // 如果表已存在则返回已存在的表
  console.log(result instanceof Error ? result : `Create table "${tableName}" success.`);
})();
