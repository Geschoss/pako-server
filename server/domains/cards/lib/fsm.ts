import { BaseState, FinitStateMachine, Page } from '../typings';

export class FSM<K extends string> implements FinitStateMachine {
  currentState: BaseState;
  constructor(
    private states: Record<K, { new (): BaseState }>,
    currentState: BaseState
  ) {
    this.currentState = currentState;
  }

  update(input: string): Page {
    return this.currentState.execute(this, input);
  }

  changeState(newStateName: K) {
    const state = new this.states[newStateName]();
    this.currentState.exit(this);
    this.currentState = state;
    this.currentState.enter(this);
    return this.update('');
  }
}
