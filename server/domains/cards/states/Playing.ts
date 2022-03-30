import { KEYS } from '../constants';
import { BodyItem, Card, GameI, Page } from '../typings';
import { Base } from './Base';

export class Playing extends Base {
  name = 'Playing';
  guesses: string[] = [];
  helpingLvl: number = 0;
  card: Card = null;

  async enter(game: GameI) {
    if (!game.strategy.hasNext()) {
      return game.changeState('GameOver');
    }

    this.card = game.strategy.next();
  }

  async execute(game: GameI, input: string) {
    switch (input) {
      case KEYS.Back:
        return game.changeState('MainMenu');
      case KEYS.Primary:
        this.helpingLvl = this.helpingLvl + 1;
        return;
    }

    if (game.strategy.isValid(input)) {
      return game.changeState('Success');
    }
    this.guesses.push(input);
  }

  async exit() {
    this.guesses = [];
    this.helpingLvl = 0;
    this.card = null;
  }

  render(game: GameI): Page {
    return {
      header: 'Playing!',
      menu: [
        { key: KEYS.Back, name: 'Back' },
        { key: KEYS.Primary, name: 'Hint' },
      ],
      body: makeBody(game, this),
      input: {
        label: 'перевод',
      },
    };
  }
}

function makeBody(game: GameI, state: Playing): BodyItem[] {
  return [
    { type: 'progress', value: game.strategy.progress() },
    { type: 'object', value: { guesses: state.guesses } },
    { type: 'question', value: game.strategy.question() },
    { type: 'object', value: game.strategy.help(state.helpingLvl) },
  ];
}
