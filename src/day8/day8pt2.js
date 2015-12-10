'use strict';

const
  fs = require('fs'),
  _ = require('lodash'),
  fileName = process.argv[2];

let lines = fs.readFileSync(fileName, 'utf8').split(/\s+/);
lines = lines.slice(0, lines.length - 1);
let memLen = 0;
let encodeLen = 0;
console.log(lines);
lines.forEach(line => {
  let len = line.length;
  memLen += line.length;
  let count = 2;
  for (let i = 0; i < line.length; i++) {
    switch (line.charAt(i)) {
      case "\"":
        count += 2;
        break;
      case "\\":
        count += 2;
        break;
      default:
        count += 1;
    }
  }
  encodeLen += count;
});
console.log(encodeLen-memLen);
