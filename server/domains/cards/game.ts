import { FSM } from './lib/fsm';
import { states } from './states';
import { BaseState, DeckI, GameI, Strategy } from './typings';
import { strategies } from './strategies';

type GameOptions = {
  states: Record<string, { new (): BaseState }>;
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

export const createGame = (deck: DeckI, logger: Console) => {
  const currentState = new states['MainMenu']();
  return new Game({ states, currentState, deck, strategies, logger });
};
