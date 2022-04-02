import fs from 'fs';
import { Card, Storage } from '../typings';

const ROW_SPLITTER = '\n';
const KEYS_SPLITTER = '|';
const VALUES_SPLITTER = ',';

export class FileStorage implements Storage {
  constructor(private path: string) {}

  async read() {
    const data = await fs.promises.readFile(this.path, 'utf8');

    return data
      .split(ROW_SPLITTER)
      .filter((row) => row !== '')
      .map(split(KEYS_SPLITTER))
      .map(this.cardFromRow);
  }
  async append(card: Card) {
    const row = this.rowFromCard(card);
    await fs.promises.appendFile(this.path, row);
  }

  async save(cards: Card[]) {
    const data = cards.map(this.rowFromCard);
    await fs.promises.writeFile(this.path, data);
  }

  cardFromRow = ([
    word,
    pos,
    translations,
    description,
    creatingDate,
  ]: string[]): Card => ({
    word,
    pos,
    translations: translations.split(VALUES_SPLITTER),
    description,
    creatingDate: new Date(creatingDate),
  });

  rowFromCard = ({
    pos,
    word,
    description,
    translations,
    creatingDate,
  }: Card) =>
    ''.concat(
      word,
      KEYS_SPLITTER,
      pos,
      KEYS_SPLITTER,
      translations.join(VALUES_SPLITTER),
      KEYS_SPLITTER,
      description,
      KEYS_SPLITTER,
      creatingDate.toISOString(),
      ROW_SPLITTER
    );
}

function split(splitter: string) {
  return (str: string) => str.split(splitter);
}
