'use strict';

const
  fs = require('fs'),
  _ = require('lodash'),
  fileName = process.argv[2];

let lines = fs.readFileSync(fileName, 'utf8').split('\n');
lines = lines.slice(0, lines.length - 1);
const wordsToNum = new Map();
let count = 0;
let pathLengths = new Map();

function getStrFromNums(n1, n2) {
  return n1 > n2 ? n1 + '' + n2 : n2 + '' + n1;
}

lines.forEach( function (line) {
  let tmp = line.split('to'),
    word1 = tmp[0].trim(),
    tmp2 = tmp[1].split('='),
    word2 = tmp2[0].trim(),
    num = +tmp2[1].trim(),
    word1Val = 0,
    word2Val = 0;
  if (wordsToNum.has(word1)) {
    word1Val = wordsToNum.get(word1);
  } else {
    word1Val = count;
    wordsToNum.set(word1, word1Val);
    count++;
  }
  if (wordsToNum.has(word2)) {
    word2Val = wordsToNum.get(word2);
  } else {
    word2Val = count;
    wordsToNum.set(word2, word2Val);
    count++;
  }

  pathLengths.set(getStrFromNums(word1Val, word2Val), num);

});


var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};
let toPerm = [];
for (let item of wordsToNum.values()) {
  toPerm.push(item);
}

let perms = permute(toPerm);

let res = perms.map(function (set) {
  let sum = 0;
  for (let i = 0; i < set.length - 1; i++) {
    sum += pathLengths.get(getStrFromNums(set[i], set[i+1]));
  }
  return sum;
});


console.log(Math.min.apply(this, res));
