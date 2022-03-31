import { GameI, Page, StateMenu } from '../../typings';
import { Base } from '../Base';

export class FillTranscription extends Base {
  name = 'FillTranscription';
  menu: StateMenu = {
    '0': {
      name: 'Back',
      state: 'AddCard',
    },
    '1': {
      name: 'Далее',
      state: 'FillDescription',
    },
  };

  async execute(game: GameI, input: string) {
    if (input === '2') {
      game.draft.translations.pop();
      return;
    }

    game.draft.translations.push(input);
  }

  render(game: GameI): Page {
    return {
      header: 'Add card: Step 2',
      menu: [
        ...this.renderMenu(),
        { key: '2', name: 'Удалить последний' },
      ],
      body: [{ type: 'object', value: game.draft }],
      input: {
        label: 'translate',
      },
    };
  }
}
