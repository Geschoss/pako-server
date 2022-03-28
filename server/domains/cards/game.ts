import { FSM } from './lib/fsm';
import { MainMenu, ShowDeck } from './states';

const states = {
  MainMenu,
  ShowDeck,
};

export class Game extends FSM<keyof typeof states> {}

export const createGame = () => {
  const initState = new MainMenu();
  return new Game(states, initState);
};
