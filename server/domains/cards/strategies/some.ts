import { array } from '../../../lib/helpers';
import { GameI } from '../typings';
import { All } from './all';

export class Some extends All {
  name = 'some';
  description = 'training random 10 card';

  start(game: GameI) {
    this.game = game;
    this.cards = array.shuffle(game.cards).slice(0, 10);
  }
}
