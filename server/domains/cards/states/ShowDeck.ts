import { KEYS } from '../constants';
import { GameI, Page } from '../typings';
import { Base } from './Base';

export class ShowDeck extends Base {
  name = 'ShowDeck';
  execute(game: GameI, input: string) {
    if (input === KEYS.Back) {
      return game.changeState('MainMenu');
    }
  }

  render(game: GameI): Page {
    return {
      header: 'Deck',
      menu: [{ key: KEYS.Back, name: 'Back' }],
      body: [
        {
          type: 'list',
          value: makeList(game),
        },
      ],
      input: {
        label: '',
      },
    };
  }
}

function makeList(game: GameI) {
  return game.cards.map(
    ({ word, translations }) => `[${word} - ${translations}]`
  );
}
