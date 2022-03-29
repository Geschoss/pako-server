export type GameI = FinitStateMachine & {
  readonly cards: Card[];
  readonly strategies: Strategy[];
  strategy: Strategy;
};

export type DeckI = {
  init(): Promise<void>;
  addCard(card: Card): Promise<void>;
  readonly list: Card[];
  readonly length: number;
};

export type Card = {
  // part-of-speech
  pos: string;
  word: string;
  translations: string[];
  description: string;
};

export type Page = {
  header: string;
  menu?: Menu[];
  input?: Input;
  body?: BodyItem[];
};

export type BodyItem = {
  type: 'list';
  value: string[];
};

export type Menu = {
  key: string;
  name: string;
};

export type Input = {
  label: string;
};

export type Strategy = {
  readonly name: string;
  readonly description: string;

  start(): void;
  next(): void;
  end(): void;
  hasNext(): void;
  isValid(): boolean;
};
// helpers
export interface Storage {
  read(): Promise<Card[]>;
  append(card: Card): Promise<void>;
}

export interface FinitStateMachine {
  update(input: string): Page;
  changeState(newStateName: string): Page;
}

export interface BaseState {
  readonly name: string;
  enter(fst: FinitStateMachine): void;
  execute(fst: FinitStateMachine, input: string): Page;
  exit(fst: FinitStateMachine): void;
}
