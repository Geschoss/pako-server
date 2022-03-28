import { BaseState, FinitStateMachine, Page } from '../typings';

export class Base implements BaseState {
  enter(fst: FinitStateMachine): void {}
  execute(fst: FinitStateMachine, input: string): Page {
    return {
      header: 'Not found',
    };
  }
  exit(fst: FinitStateMachine): void {}
}
