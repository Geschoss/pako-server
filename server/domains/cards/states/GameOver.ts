import { KEYS } from '../constants';
import { GameI, Page } from '../typings';
import { Base } from './Base';

export class GameOver extends Base {
  async enter(game: GameI) {
    game.strategy.end();
  }

  async execute(game: GameI, input: string) {
    if (input === KEYS.Enter) {
      game.changeState('MainMenu');
      return;
    }
  }

  render(game: GameI): Page {
    return {
      header: 'Game over!!',
      menu: [{ key: 'Enter', name: 'Go to Main menu' }],
      input: {
        label: 'input',
      },
    };
  }
}
