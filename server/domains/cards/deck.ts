import { array } from '../../lib/helpers';
import { Card, DeckI, Storage } from './typings';

export class Deck implements DeckI {
  private cards: Card[];

  constructor(private storage: Storage) {
    this.cards = [];
  }
  async init() {
    this.cards = await this.storage.read();
  }
  async addCard(card: Card) {
    // TODO validator
    this.cards.push(card);
    await this.storage.append(card);
  }
  async getCards(count?: number) {
    const cards = array.shuffle([...this.cards]);
    if (count) {
      return cards.slice(0, count);
    }
    return cards;
  }
  get length() {
    return this.cards.length;
  }
}

export const createDeck = async (storage: Storage) => {
  const deck = new Deck(storage);
  await deck.init();
  return deck;
};
