export interface BaseState {
  enter(): void;
  execute(): void;
  exit(): void;
}

export class FSM<K extends string> {
  constructor(
    private states: Record<K, { new (): BaseState }>,
    private currentState: BaseState
  ) {}

  update() {
    this.currentState.execute();
  }

  changeState(newStateName: K) {
    const state = new this.states[newStateName]();
    this.currentState.exit();
    this.currentState = state;
    this.currentState.enter();
  }
}
