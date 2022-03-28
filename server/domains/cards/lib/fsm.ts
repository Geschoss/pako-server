import { BaseState } from '../typings';

export class FSM<K extends string> {
  currentState: BaseState;
  constructor(
    private states: Record<K, { new (): BaseState }>,
    currentState: BaseState
  ) {
    this.currentState = currentState;
  }

  update(input: string) {
    this.currentState.execute(input);
  }

  changeState(newStateName: K) {
    const state = new this.states[newStateName]();
    this.currentState.exit();
    this.currentState = state;
    this.currentState.enter();
  }
}
