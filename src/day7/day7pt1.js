'use strict';

const
  fs = require('fs'),
  _ = require('lodash'),
  fileName = process.argv[2],
  NOT = 1,
  ARG1 = 2,
  OP = 3,
  ARG2 = 4,
  RES = 5,
  GOAL = 'a';

class Rule {

  constructor(str) {
    let tuple = str.match(/(?:(NOT) )?(\w*|\d*)(?: (AND|OR|LSHIFT|RSHIFT) (\w*|\d*))? -> (\w*)/);
    if (tuple != null) {
      this.op = tuple[NOT] || tuple[OP];
      this.arg1 = isNaN(tuple[ARG1]) ? tuple[ARG1] : +tuple[ARG1];
      this.arg2 = isNaN(tuple[ARG2]) ? tuple[ARG2] : +tuple[ARG2];
      this.res = tuple[RES];
    }
  }

  canBeSolved() {
    if (this.op === 'NOT' && this.arg1 != null && ! isNaN(this.arg1)) {
      return true;
    } else if (! this.op && this.arg1 != null && ! isNaN(this.arg1)) {
      return true;
    } else if (this.arg1 != null && ! isNaN(this.arg1) && this.arg2 != null && ! isNaN(this.arg2)) {
      return true;
    }
    return false;
  }

  solve() {
    switch (this.op) {
      case 'NOT':
        return (~this.arg1 >>> 0) & 0xffff;
      case 'AND':
        return (this.arg1 & this.arg2) >>> 0;
      case 'OR':
        return (this.arg1 | this.arg2) >>> 0;
      case 'LSHIFT':
        return (this.arg1 << this.arg2) >>> 0;
      case 'RSHIFT':
        return (this.arg1 >>> this.arg2) >>> 0;
      default:
        return this.arg1;
    }
  }

  replace(variable, val) {
    this.arg1 = this.arg1 === variable ? val : this.arg1;
    this.arg2 = this.arg2 === variable ? val : this.arg2;
  }
}



let instructions = fs.readFileSync(fileName, 'utf8').split('\n').map(line => new Rule(line));
instructions = instructions.slice(0, instructions.length - 1);

let canBeSolved = instructions.filter(item => item.canBeSolved());
instructions = instructions.filter(item => ! item.canBeSolved());


while (canBeSolved.length != 0) {
  let toSolve = canBeSolved.shift();
  debugger;
  let sol = toSolve.solve();
  console.log(toSolve.res + ': ' + sol);
  if (toSolve.res === GOAL) {
    console.log(sol);
    break;
  } else {
    instructions.forEach(item => item.replace(toSolve.res, sol));
    canBeSolved = canBeSolved.concat(instructions.filter(item => item.canBeSolved()));
    instructions = instructions.filter(item => ! item.canBeSolved());
  }
}
