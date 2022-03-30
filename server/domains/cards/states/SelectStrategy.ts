import { KEYS } from '../constants';
import { GameI, Page } from '../typings';
import { Base } from './Base';

export class SelectStrategy extends Base {
  name = 'SelectStrategy';
  async execute(game: GameI, input: string) {
    if (input === KEYS.Back) {
      return game.changeState('MainMenu');
    }

    try {
      const selectedStrategy = parseInt(input, 10);
      const strategy = game.strategies[selectedStrategy - 1];
      if (strategy) {
        game.strategy = strategy;
        await game.strategy.start(game);
        return game.changeState('Playing');
      }
    } catch (error) {}
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
  game.strategies.forEach(({ description, name }, index) => {
    result.push({ key: index + 1, name: `${name} (${description})` });
  });

  result.push({
    key: KEYS.Back,
    name: 'Back',
  });
  return result;
}
