import { GameI } from '../typings';
import { Base } from './Base';

export class MainMenu extends Base {
  name = 'MainMenu';
  execute(game: GameI, input: string) {
    switch (input) {
      case '1':
        return game.changeState('SelectStrategy');
      case '3':
        return game.changeState('ShowDeck');
    }
    return this.render();
  }

  render() {
    return {
      header: 'Main menu',
      menu: [
        { key: '1', name: 'Play' },
        { key: '2', name: 'Add new card' },
        { key: '3', name: 'Show deck' },
      ],
      input: {
        label: 'select menu',
      },
    };
  }
}
