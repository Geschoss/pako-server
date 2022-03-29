import fs from 'fs';
import { Card, Storage } from '../typings';

const split = (splitter: string) => (str: string) =>
  str.split(splitter);

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
    await fs.promises.appendFile(this.path, `${row}${ROW_SPLITTER}`);
  }

  cardFromRow = ([
    word,
    pos,
    translations,
    description,
  ]: string[]): Card => ({
    word,
    pos,
    translations: translations.split(VALUES_SPLITTER),
    description,
  });

  rowFromCard = ({ word, translations, pos, description }: Card) =>
    ''.concat(
      word,
      KEYS_SPLITTER,
      pos,
      KEYS_SPLITTER,
      translations.join(VALUES_SPLITTER),
      KEYS_SPLITTER,
      description
    );
}
