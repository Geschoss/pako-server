import { GameI, Page } from '../typings';
import { Base } from './Base';

export class ShowDeck extends Base {
  name = 'ShowDeck';
  execute(game: GameI, input: string) {
    if (input === '') {
      return game.changeState('MainMenu');
    }

    return this.render(game);
  }

  render(game: GameI): Page {
    return {
      header: 'Deck',
      menu: [{ key: 'Enter', name: 'Back' }],
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
