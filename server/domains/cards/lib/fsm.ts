import { BaseState, FinitStateMachine, Page } from '../typings';

export class FSM implements FinitStateMachine {
  currentState: BaseState;
  logger: Console;
  constructor(
    private states: Record<string, { new (): BaseState }>,
    currentState: BaseState,
    logger: Console
  ) {
    this.currentState = currentState;
    this.logger = logger;
  }

  async update(input: string) {
    this.logger.log(
      `State ${this.currentState.name} updated with input ${input}`
    );
    await this.currentState.execute(this, input);
  }

  async changeState(newStateName: string) {
    const state = new this.states[newStateName]();
    this.logger.log(
      `State ${this.currentState.name} changed to ${state.name}`
    );
    await this.currentState.exit(this);
    this.currentState = state;
    await this.currentState.enter(this);
  }

  render(): Page {
    return this.currentState.render(this);
  }
}
