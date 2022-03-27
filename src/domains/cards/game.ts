import { array } from './lib';

export const game = () => {
  return {
    log(...args: any[]) {
      console.log(array.join(',', args));
    },
    sum(a: number, b: number) {
      return a + b;
    },
  };
};
