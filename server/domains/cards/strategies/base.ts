import { Strategy } from '../typings';

export class BaseStrategy implements Strategy {
  name = 'base';
  description = '';

  start() {}
  next() {}
  end() {}

  hasNext() {}
  isValid() {
    return false;
  }
}
