import { KEYS } from '../constants';
import { Card, GameI, Page, StateMenu } from '../typings';
import { Base } from './Base';

export class AddDate extends Base {
  name = 'AddDate';
  menu: StateMenu = {
    [KEYS.Enter]: { state: 'MainMenu', name: 'Back' },
  };

  async enter(game: GameI) {
    const cards = (await game.deck.getCards()).map((card) => ({
      ...card,
      creatingDate: new Date(),
    }));

    cards.sort((a, b) => {
      if (a.word < b.word) {
        return -1;
      }
      if (a.word > b.word) {
        return 1;
      }
      return 0;
    });

    game.deck.save(cards);
  }

  async execute(game: GameI, input: string) {}

  render(game: GameI): Page {
    return {
      header: 'AddDate',
      menu: this.renderMenu(),

      input: {
        label: 'back(y)',
      },
    };
  }
}
