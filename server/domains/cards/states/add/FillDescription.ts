import { GameI, Page, StateMenu } from '../../typings';
import { Base } from '../Base';

export class FillDescription extends Base {
  name = 'FillDescription';
  menu: StateMenu = {
    '0': {
      name: 'Back',
      state: 'AddCard',
    },
    '1': {
      name: 'Далее',
      state: 'FillPos',
    },
  };
  async execute(game: GameI, input: string) {
    game.draft.description = input;
  }

  render(game: GameI): Page {
    return {
      header: 'Add card: Step 3',
      menu: this.renderMenu(),
      body: [{ type: 'object', value: game.draft }],
      input: {
        label: 'description',
      },
    };
  }
}
