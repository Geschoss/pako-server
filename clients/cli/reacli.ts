import {
  Page,
  BodyItem,
  Progress,
  Question,
} from '../../server/domains/cards/typings';
// @ts-ignore
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({ input: stdin, output: stdout });
const RED_COLOR = '\x1b[31m';
const GREEN_COLOR = '\x1b[32m';
const YELLOW_COLOR = '\x1b[33m';
const RESET_COLOR = '\x1b[0m';
const BOLT_COLOR = '\x1b[1m';
const green = (str: string) => `${GREEN_COLOR}${str}${RESET_COLOR}`;
const bolt = (str: string | number) =>
  `${BOLT_COLOR}${str}${RESET_COLOR}`;

export const reacli = {
  write: (str: string) => process.stdout.write(`${green(str)}\n`),
  clear: () => process.stdout.write('\x1Bc'),
  newLine: () => process.stdout.write('\n'),
  menu,
  input,
  body,
  loading,
};

function loading() {
  reacli.write('Loading...');
}

function menu(m: Page['menu']) {
  if (!m || !m.length) return;
  reacli.newLine();
  m.forEach(({ key, name }) => {
    reacli.write(`${bolt(key)}: ${green(name)}`);
  });
  reacli.newLine();
}

async function input(i: Page['input']) {
  if (!i) return '';
  const { label = '' } = i;
  return await rl.question(green(`${label}: `));
}

function body(b: Page['body']) {
  if (!b) return '';
  b.forEach(renderComponentByType);
}

const components = {
  list: (list: string[]) => list.forEach(reacli.write),

  progress: ({ label, from, to }: Progress) =>
    reacli.write(
      `${label} ${bolt(from)} ${green('of')} ${green(bolt(to))}`
    ),

  object: (object: Record<string, any>) => {
    Object.entries(object).forEach(([key, value]) => {
      reacli.write(`${key}: ${bolt(value)}`);
    });
  },

  question: ({ label, value }: Question) => {
    reacli.write(`${label}: ${bolt(value)}`);
  },
};
function renderComponentByType({ type, value }: BodyItem) {
  const component = components[type];
  if (!component) {
    throw new Error(`Cant find component by type ${type}`);
  }
  // @ts-ignore
  return component(value);
}
