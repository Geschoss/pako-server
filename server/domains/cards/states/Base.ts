import { BaseState, FinitStateMachine, Page } from '../typings';

export class Base implements BaseState {
  name = 'Base';
  async enter(fst: FinitStateMachine) {}
  async execute(fst: FinitStateMachine, input: string) {}
  async exit(fst: FinitStateMachine) {}

  render(fst: FinitStateMachine) {
    return {
      header: 'Not found',
    };
  }
}
