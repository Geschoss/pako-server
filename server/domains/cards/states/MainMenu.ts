import { GameI, StateMenu } from '../typings';
import { Base } from './Base';

export class MainMenu extends Base {
  name = 'MainMenu';
  menu: StateMenu = {
    1: { state: 'SelectStrategy', name: 'Play' },
    2: { state: 'FillWord', name: 'Add new card' },
    3: { state: 'ShowDeck', name: 'Show deck' },
  };

  async execute(game: GameI, input: string) {}

  render() {
    return {
      header: 'Main menu',
      menu: this.renderMenu(),
      input: {
        label: 'select menu',
      },
    };
  }
}
