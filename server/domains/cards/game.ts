import { FSM } from './lib/fsm';
import {
  MainMenu,
  ShowDeck,
  Playing,
  SelectStrategy,
  Success,
  GameOver,
} from './states';
import { BaseState, DeckI, GameI, Strategy } from './typings';

const states = {
  MainMenu,
  ShowDeck,
  Playing,
  SelectStrategy,
  Success,
  GameOver,
};
type States = keyof typeof states;
type GameOptions = {
  states: Record<States, { new (): BaseState }>;
  currentState: BaseState;
  deck: DeckI;
  strategies: Strategy[];
  logger: Console;
};
export class Game extends FSM implements GameI {
  deck: DeckI;
  strategies: Strategy[];
  strategy: Strategy;

  constructor({
    states,
    currentState,
    deck,
    strategies,
    logger,
  }: GameOptions) {
    super(states, currentState, logger);
    this.deck = deck;
    this.strategies = strategies;
  }
}

export const createGame = (
  deck: DeckI,
  strategies: Strategy[],
  logger: Console
) => {
  const currentState = new MainMenu();
  return new Game({ states, currentState, deck, strategies, logger });
};
