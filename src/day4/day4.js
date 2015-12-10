'use strict';
const md5 = require('md5');
const key = 'yzbqklnj';

function countLeadingZeroes(str) {
  return str.match(/^0*/)[0].length;
}

let numZeroes = process.argv[2];
let count = 1;
let res = md5(key + count);
while (countLeadingZeroes(md5(key + count)) < numZeroes) {
  count++;
}
console.log(count);
