'use strict';

const
  fs = require('fs'),
  _ = require('lodash'),
  fileName = process.argv[2];

let lines = fs.readFileSync(fileName, 'utf8').split(/\s+/);
lines = lines.slice(0, lines.length - 1);
let memLen = 0;
let realLen = 0;
console.log(lines);
lines.forEach(line => {
  debugger;
  console.log(line.length);
  console.log(eval(line).length);
  memLen += line.length;
  realLen += eval(line).length;
});
console.log(memLen-realLen);
