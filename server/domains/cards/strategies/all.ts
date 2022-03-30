import { array } from '../../../lib/helpers';
import { Card, GameI } from '../typings';
import { Base } from './base';

export class All extends Base {
  name = 'all';
  description = 'training all shuffled cards';

  card: Card;
  game: GameI;
  cards: Card[] = [];

  index = -1;

  hasNext() {
    return this.index + 1 < this.cards.length;
  }

  start(game: GameI) {
    this.game = game;
    this.cards = array.shuffle(game.cards);
  }

  next() {
    this.index = this.index + 1;
    this.card = this.cards[this.index];

    return this.card;
  }

  end() {
    this.index = -1;
  }

  progress() {
    return {
      from: this.index + 1,
      to: this.cards.length,
      label: 'cards',
    };
  }

  help(lvl: number) {
    if (lvl > 0) {
      return {
        description: this.card.description,
      };
    }

    return {};
  }
}
