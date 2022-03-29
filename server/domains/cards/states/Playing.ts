import { GameI, Page } from '../typings';
import { Base } from './Base';

export class Playing extends Base {
  name = 'Playing';
  execute(game: GameI, input: string) {
    switch (input) {
      case '0':
        return game.changeState('MainMenu');
    }
    return this.render(game);
  }

  render(game: GameI): Page {
    return {
      header: 'Playing!',
      menu: [{ key: '0', name: 'Back' }],
      input: {
        label: '',
      },
    };
  }
}
