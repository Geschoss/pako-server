import {
  BaseState,
  FinitStateMachine,
  Page,
  StateMenu,
} from '../typings';

export abstract class Base implements BaseState {
  abstract name: string;
  menu: StateMenu = {};

  abstract render(fst: FinitStateMachine): Page;

  async execute(fst: FinitStateMachine, input: string) {}
  async exit(fst: FinitStateMachine) {}
  async enter(fst: FinitStateMachine) {}

  renderMenu() {
    return Object.entries(this.menu).map(([key, { name }]) => ({
      key,
      name,
    }));
  }
}
