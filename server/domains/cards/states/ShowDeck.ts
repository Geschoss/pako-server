import { GameI, Page } from '../typings';
import { Base } from './BaseState';

export class ShowDeck extends Base {
  execute(game: GameI, input: string) {
    switch (input) {
      case '':
        game.changeState('MainMenu');
        break;
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
