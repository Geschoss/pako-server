import { KEYS } from '../../constants';
import { GameI, Page, StateMenu } from '../../typings';
import { Base } from '../Base';

export class GameOver extends Base {
  name = 'GameOver';
  menu: StateMenu = {
    [KEYS.Enter]: { state: 'MainMenu', name: 'Go to Main menu' },
  };

  async enter(game: GameI) {
    game.strategy.end();
  }

  render(game: GameI): Page {
    return {
      header: 'Game over!!',
      menu: this.renderMenu(),
      input: {
        label: 'back(y)',
      },
    };
  }
}
