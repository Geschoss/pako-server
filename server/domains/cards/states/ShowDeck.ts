import { FinitStateMachine } from '../typings';
import { Base } from './BaseState';

export class ShowDeck extends Base {
  execute(fst: FinitStateMachine, input: string) {
    switch (input) {
      case '':
        fst.changeState('MainMenu');
        break;
    }
    return this.render();
  }

  render() {
    return {
      header: 'Deck',
      menu: [{ key: 'Enter', name: 'Back' }],
      input: {
        label: '',
      },
    };
  }
}
