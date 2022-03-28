import { BaseState } from '../typings';

export class Base implements BaseState {
  enter() {}
  execute() {
    return {
      header: 'Base',
    };
  }
  exit() {}
}
