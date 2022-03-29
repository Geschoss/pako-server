import { BaseStrategy } from './base';
// const array = require('../lib/array.js');

export class All extends BaseStrategy {
  name = 'all';
  description = 'training all shuffled cards';

  hasNext() {
    return false;
  }

  start() {}

  next() {}

  end() {}
}
