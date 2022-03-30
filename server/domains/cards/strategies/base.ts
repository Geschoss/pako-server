import { Card, GameI, Strategy, Progress } from '../typings';

export abstract class Base implements Strategy {
  abstract name: string;
  abstract description: string;

  abstract card: Card;
  abstract game: GameI;
  abstract cards: Card[];

  abstract hasNext(): boolean;

  abstract start(game: GameI): void;
  abstract next(): Card;
  abstract end(): void;
  abstract progress(): Progress;
  abstract help(lvl: number): Record<string, any>;

  isValid(input: string) {
    return this.card.translations.includes(input);
  }

  question() {
    return {
      label: 'Напишите перевод слова',
      value: this.card.word,
    };
  }

  answer() {
    return this.card;
  }
}
