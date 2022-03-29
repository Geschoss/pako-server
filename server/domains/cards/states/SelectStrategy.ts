import { GameI, Page } from '../typings';
import { Base } from './Base';

export class SelectStrategy extends Base {
  name = 'SelectStrategy';
  execute(game: GameI, input: string) {
    if (input === '0') {
      return game.changeState('MainMenu');
    }

    try {
      const selectedStrategy = parseInt(input, 10);
      const strategy = game.strategies[selectedStrategy - 1];
      if (strategy) {
        game.strategy = strategy;
        game.strategy.start();
        return game.changeState('Playing');
      }
    } catch (error) {}

    return this.render(game);
  }

  render(game: GameI): Page {
    return {
      header: 'Select strategy',
      menu: makeMenu(game),
      input: {
        label: 'select strategy',
      },
    };
  }
}

function makeMenu(game: GameI) {
  let result = [];
  game.strategies.forEach((strategy, index) => {
    result.push({ key: index + 1, name: strategy.description });
  });

  result.push({
    key: '0',
    name: 'Back',
  });
  return result;
}
