import { array } from '../../../lib/helpers';
import { GameI } from '../typings';
import { All } from './all';

export class Some extends All {
  name = 'some';
  description = 'training random 10 card';

  async start(game: GameI) {
    this.game = game;
    const cards = await game.deck.getCards(10);
    this.cards = array.shuffle(cards);
  }
}
