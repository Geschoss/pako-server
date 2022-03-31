import { GameI, Page, StateMenu } from '../../typings';
import { Base } from '../Base';

export class FillWord extends Base {
  name = 'FillWord';
  menu: StateMenu = {
    '0': {
      name: 'Back',
      state: 'AddCard',
    },
    '1': {
      name: 'Далее',
      state: 'FillTranscription',
    },
  };

  async execute(game: GameI, input: string) {
    game.draft.word = input;
  }

  render(game: GameI): Page {
    return {
      header: 'Add card: Step 1',
      menu: this.renderMenu(),
      body: [{ type: 'object', value: game.draft }],
      input: {
        label: 'word',
      },
    };
  }
}
