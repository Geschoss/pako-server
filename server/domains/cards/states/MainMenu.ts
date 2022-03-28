import { Base } from './BaseState';

export class MainMenu extends Base {
  execute() {
    return {
      header: 'Main menu',
      menu: [
        { key: '1', name: 'Play' },
        { key: '2', name: 'Add new card' },
        { key: '3', name: 'Show deck' },
        { key: '0', name: 'Exit' },
      ],
      input: {
        label: ''
      }
    };
  }
}
