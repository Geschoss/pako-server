import { GameI, Page, StateMenu } from '../../typings';
import { Base } from '../Base';

export class SaveCard extends Base {
  name = 'SaveCard';
  menu: StateMenu = {
    '0': {
      name: 'Back',
      state: 'AddCard',
    },
  };
  async execute(game: GameI, input: string) {
    if (input === '') {
      game.saveCard();
      game.changeState('MainMenu');
    }
  }

  render(game: GameI): Page {
    return {
      header: 'Save card',
      menu: [
        ...this.renderMenu(),
        {
          key: '',
          name: 'Сохранить',
        },
      ],
      body: [{ type: 'object', value: game.draft }],
      input: {
        label: 'save?(y)',
      },
    };
  }
}
