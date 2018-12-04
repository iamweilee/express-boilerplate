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


const Model = require(`../biz/${tableName}/model`);

if (!Model) {
  console.error(`Model of table "${tableName}" not found.`);
  return;
}

(async function() {
  let result = await Model.drop();
  console.log(result instanceof Error ? result : `Drop table "${dbName}" success.`);
})();
