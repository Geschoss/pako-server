import { KEYS } from '../constants';
import { Card, FinitStateMachine, GameI, Page } from '../typings';
import { Base } from './Base';

export class ShowDeck extends Base {
  name = 'ShowDeck';
  cards: Card[];

  async enter(game: GameI) {
    this.cards = await game.deck.getCards();
  }

  async execute(game: GameI, input: string) {
    return game.changeState('MainMenu');
  }

  render(game: GameI): Page {
    return {
      header: 'Deck',
      menu: [{ key: 'Enter', name: 'Back' }],
      body: [
        {
          type: 'list',
          value: makeList(this),
        },
      ],
      input: {
        label: 'back(y)',
      },
    };
  }
}

function makeList(state: ShowDeck) {
  return state.cards.map(
    ({ word, translations }) => `[${word} - ${translations}]`
  );
}
