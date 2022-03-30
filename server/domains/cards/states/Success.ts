import { KEYS } from '../constants';
import { BodyItem, Card, GameI, Page } from '../typings';
import { Base } from './Base';

export class Success extends Base {
  execute(game: GameI, input: string) {
    switch (input) {
      case KEYS.Back:
        game.changeState('MainMenu');
        break;
      case KEYS.Enter:
        game.changeState('Playing');
        break;
    }
  }

  render(game: GameI): Page {
    return {
      header: 'Success!',
      menu: [
        { key: 'Enter', name: 'Continue' },
        { key: KEYS.Back, name: 'Back to Menu' },
      ],
      body: makeBody(game, this),
      input: {
        label: 'select',
      },
    };
  }
}

function makeBody(game: GameI, state: Success): BodyItem[] {
  return [{ type: 'object', value: game.strategy.answer() }];
}
