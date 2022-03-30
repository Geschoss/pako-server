import { GameI } from '../typings';
import { All } from './all';

export class Some extends All {
  name = 'some';
  description = 'training random 10 card';

  async start(game: GameI) {
    this.game = game;
    this.game = game;
    this.cards = await game.deck.getCards(10);
  }
}
