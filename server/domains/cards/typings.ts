export interface FinitStateMachine {
  update(input: string): Page;
  changeState(newStateName: string): Page;
}

export type BaseState = {
  enter(fst: FinitStateMachine): void;
  execute(fst: FinitStateMachine, input: string): Page;
  exit(fst: FinitStateMachine): void;
};

export type Page = {
  header: string;
  menu?: Menu[];
  input?: Input;
};

export type Menu = {
  key: string;
  name: string;
};

export type Input = {
  label: string;
};
