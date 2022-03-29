import { FSM } from './lib/fsm';
import { MainMenu, ShowDeck } from './states';
import { BaseState, DeckI } from './typings';

const states = {
  MainMenu,
  ShowDeck,
};
type States = keyof typeof states;

export class Game extends FSM {
  deck: DeckI;

  constructor(
    states: Record<States, { new (): BaseState }>,
    currentState: BaseState,
    deck: DeckI
  ) {
    super(states, currentState);
    this.deck = deck;
  }

  get cards() {
    return this.deck.list;
  }
}

export const createGame = (deck: DeckI) => {
  const initState = new MainMenu();
  return new Game(states, initState, deck);
};
