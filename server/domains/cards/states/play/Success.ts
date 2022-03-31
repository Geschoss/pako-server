import { KEYS } from '../../constants';
import { BodyItem, GameI, Page, StateMenu } from '../../typings';
import { Base } from '../Base';

export class Success extends Base {
  name = 'Success';
  menu: StateMenu = {
    [KEYS.Enter]: { state: 'Playing', name: 'Continue' },
    [KEYS.Back]: { state: 'MainMenu', name: 'Back to Menu' },
  };

  render(game: GameI): Page {
    return {
      header: 'Success!',
      menu: this.renderMenu(),
      body: makeBody(game, this),
      input: {
        label: 'continue(y)',
      },
    };
  }
}

function makeBody(game: GameI, state: Success): BodyItem[] {
  return [{ type: 'object', value: game.strategy.answer() }];
}
