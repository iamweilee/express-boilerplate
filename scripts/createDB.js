require('babel-register');
const db = require('db');

let result = db.query('create database beautyerp default character set utf8mb4 collate utf8mb4_unicode_ci;');

console.log(result);