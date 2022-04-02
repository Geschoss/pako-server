import { GameI, Page, StateMenu } from '../../typings';
import { Base } from '../Base';

export class FillPos extends Base {
  name = 'FillPos';
  menu: StateMenu = {
    '0': {
      name: 'Back',
      state: 'FillDescription',
    },
    '1': {
      name: 'Далее',
      state: 'SaveCard',
    },
  };
  async execute(game: GameI, input: string) {
    game.draft.pos = input;
    game.changeState('SaveCard');
  }

  render(game: GameI): Page {
    return {
      header: 'Add card: Step 4',
      menu: this.renderMenu(),
      body: [{ type: 'object', value: game.draft }],
      input: {
        label: 'pos',
      },
    };
  }
}
