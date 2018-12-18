'use strict';

require('babel-register');

const db = require('../db');

const { parsedWithBlank, parsedWithEqual } = require('../utils/args');

let args = parsedWithEqual();
let tableName = args.name;

if (!tableName) {
  console.error('Please input table name with "name=table_name".');
  return;
}

(async function() {
  let result = await db.query(`drop table ${tableName};`);
  console.log(result instanceof Error ? result : `Drop table "${tableName}" success.`);
})();