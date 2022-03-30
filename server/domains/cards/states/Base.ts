import { BaseState, FinitStateMachine, Page } from '../typings';

export class Base implements BaseState {
  name = 'Base';
  enter(fst: FinitStateMachine): void {}
  execute(fst: FinitStateMachine, input: string) {}
  exit(fst: FinitStateMachine): void {}
  render(fst: FinitStateMachine): Page {
    return {
      header: 'Not found',
    };
  }
}
