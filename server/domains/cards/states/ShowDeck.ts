import { KEYS } from '../constants';
import { Card, GameI, Page, StateMenu } from '../typings';
import { Base } from './Base';

export class ShowDeck extends Base {
  name = 'ShowDeck';
  menu: StateMenu = {
    [KEYS.Enter]: { state: 'MainMenu', name: 'Back' },
  };

  cards: Card[];

  async enter(game: GameI) {
    this.cards = await game.deck.getCards();
    this.cards.sort((a, b) => {
      if (a.word < b.word) {
        return -1;
      }
      if (a.word > b.word) {
        return 1;
      }
      return 0;
    });
  }

  async execute(game: GameI, input: string) {}

  render(game: GameI): Page {
    return {
      header: 'Deck',
      menu: this.renderMenu(),
      body: [
        {
          type: 'list',
          value: makeList(this),
        },
      ],
      input: {
        label: 'back(y)',
      },
    };
  }
}

function makeList(state: ShowDeck) {
  return state.cards.map(
    ({ word, translations }) => `[${word} - ${translations}]`
  );
}
