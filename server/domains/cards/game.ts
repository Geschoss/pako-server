import { FSM } from './lib/fsm';
import { MainMenu } from './states';

const states = {
  MainMenu,
};

export class Game extends FSM<keyof typeof states> {

}

export const createGame = () => {
  const initState = new MainMenu();
  return new Game(states, initState);
};
