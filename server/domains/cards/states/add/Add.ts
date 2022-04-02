import { KEYS } from '../../constants';
import { FinitStateMachine, GameI, StateMenu } from '../../typings';
import { Base } from '../Base';

export class AddCard extends Base {
  name = 'Add';
  menu: StateMenu = {
    '0': {
      name: 'Go to Main menu',
      state: 'MainMenu',
    },
    '1': {
      name: 'Заполнить слово',
      state: 'FillWord',
    },
    '2': {
      name: 'Заполнить перевод',
      state: 'FillTranscription',
    },
    '3': {
      name: 'Заполнить описание',
      state: 'FillDescription',
    },
    '4': {
      name: 'Заполнить часть речи',
      state: 'FillPos',
    },
    [KEYS.Enter]: {
      name: 'Save',
      state: 'SaveCard',
    },
  };

  async execute(game: GameI, input: string) {}

  render(game: GameI) {
    return {
      header: 'Add card',
      menu: this.renderMenu(),
      input: {
        label: 'select',
      },
    };
  }
}
