export type State =
  | 'MainMenu'
  | 'ShowDeck'
  | 'Playing'
  | 'SelectStrategy'
  | 'Success'
  | 'GameOver'
  | 'FillWord'
  | 'FillTranscription'
  | 'FillDescription'
  | 'FillPos'
  | 'SaveCard'
  | 'AddDate'
  | 'AddCard';

export type GameI = FinitStateMachine & {
  readonly strategies: Strategy[];
  readonly deck: DeckI;
  strategy: Strategy;
  draft: Card;
  end(): void;
  saveCard(): Promise<void>;
};

export type DeckI = {
  init(): Promise<void>;
  addCard(card: Card): Promise<void>;
  getCards(count?: number): Promise<Card[]>;
  readonly length: number;
  save(cards: Card[]): Promise<void>;
};

export type Card = {
  // part-of-speech
  pos: string;
  word: string;
  translations: string[];
  description: string;
  creatingDate: Date;
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

  start(game: GameI): Promise<void>;
  next(): Card;
  end(): Promise<void>;
  hasNext(): boolean;
  isValid(input: string): boolean;

  question(): Question;
  progress(): Progress;
  answer(): Card;
  help(lvl: number): Record<string, any>;
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
  save(cards: Card[]): Promise<void>;
}

export interface FinitStateMachine {
  update(input: string): Promise<void>;
  changeState(newStateName: State): void;
  render(): Page;
}

export type StateMenu = Record<
  string,
  {
    name: string;
    state: State;
  }
>;
export interface BaseState {
  readonly name: string;
  readonly menu?: StateMenu;

  enter(fst: FinitStateMachine): Promise<void>;
  execute(fst: FinitStateMachine, input: string): Promise<void>;
  exit(fst: FinitStateMachine): Promise<void>;
  render(fst: FinitStateMachine): Page;
  renderMenu(): Menu[];
}
