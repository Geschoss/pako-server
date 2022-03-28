import { Page } from '../../server/domains/cards/typings';
// @ts-ignore
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const RED_COLOR = '\x1b[31m';
const GREEN_COLOR = '\x1b[32m';
const YELLOW_COLOR = '\x1b[33m';
const RESET_COLOR = '\x1b[0m';
const green = (str: string) => `${GREEN_COLOR}${str}${RESET_COLOR}`;

export const reacli = {
  write: (str: string) => {
    process.stdout.write(`${green(str)}\n`);
  },
  clear() {
    process.stdout.write('\x1Bc');
  },
  newLine() {
    process.stdout.write('\n');
  },
  renderMenu: (menu: Page['menu']) => {
    if (!menu || !menu.length) return;
    reacli.newLine();
    menu.forEach(({ key, name }) => {
      reacli.write(`${key}: ${name}`);
    });
    reacli.newLine();
  },
  renderInput: async (screen: Page['input']) => {
    if (!screen) return '';
    const { label = '' } = screen;
    return await rl.question(`${green(label)}>`);
  },
};
