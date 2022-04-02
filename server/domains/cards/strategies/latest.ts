import { array } from '../../../lib/helpers';
import { GameI } from '../typings';
import { All } from './all';

export class Latest extends All {
  name = 'lates';
  description = 'training latest random 10 card';

  async start(game: GameI) {
    this.game = game;

    const cards = await game.deck.getCards();
    cards.sort(
      (a, b) => b.creatingDate.getTime() - a.creatingDate.getTime()
    );
    this.cards = array.shuffle(cards.slice(0, 10));
  }
}
