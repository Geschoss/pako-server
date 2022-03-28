import { FinitStateMachine } from '../typings';
import { Base } from './BaseState';

export class MainMenu extends Base {
  execute(fst: FinitStateMachine, input: string) {
    console.log({ input });
    switch (input) {
      case '3':
        return fst.changeState('ShowDeck');
    }
    return this.render();
  }

  render() {
    return {
      header: 'Main menu',
      menu: [
        { key: '1', name: 'Play' },
        { key: '2', name: 'Add new card' },
        { key: '3', name: 'Show deck' },
      ],
      input: {
        label: 'Select menu',
      },
    };
  }
}
