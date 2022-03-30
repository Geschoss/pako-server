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

// Body types
export type BodyItem =
  | BodyList
  | BodyProgress
  | BodyObject
  | BodyQuestion;

export type BodyList = {
  type: 'list';
  value: string[];
};
export type BodyProgress = {
  type: 'progress';
  value: Progress;
};
export type BodyObject = {
  type: 'object';
  value: Record<string, any>;
};
export type BodyQuestion = {
  type: 'question';
  value: Question;
};
// Body types

export type Menu = {
  key: string;
  name: string;
};

export type Input = {
  label: string;
};

export interface Strategy {
  readonly name: string;
  readonly description: string;
  readonly card: Card;
  readonly cards: Card[];
  readonly game: GameI;

  start(game: GameI): void;
  next(): Card;
  end(): void;
  hasNext(): boolean;
  isValid(input: string): boolean;

  question(): Question;
  progress(): Progress;
  answer(): Card;
}
export type Progress = {
  from: number;
  to: number;
  label: string;
};
export type Question = {
  label: string;
  value: string;
};

// helpers
export interface Storage {
  read(): Promise<Card[]>;
  append(card: Card): Promise<void>;
}

export interface FinitStateMachine {
  update(input: string): void;
  changeState(newStateName: string): void;
  render(): Page;
}

export interface BaseState {
  readonly name: string;
  enter(fst: FinitStateMachine): void;
  execute(fst: FinitStateMachine, input: string): void;
  exit(fst: FinitStateMachine): void;
  render(fst: FinitStateMachine): Page;
}
