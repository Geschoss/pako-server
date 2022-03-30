export const array = {
  range: <U>(
    size: number,
    // @ts-ignore
    mapfn?: (_: undefined, i: number) => U = (
      _: undefined,
      i: number
    ) => i
  ) => Array.from({ length: size }, mapfn),

  make: <U>(mapfn: (v: any, k: number) => U, length: number) =>
    Array.from({ length }, mapfn),

  shuffle: <U>(arr: U[]) => {
    const result = [...arr];
    result.sort(() => Math.random() - 0.5);
    return result;
  },
};

export const random = {
  int: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
  float: (min: number, max: number, decimals: number) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
  },
};

export const string = {
  padLeft: (str: string | number, length: number) =>
    ('000000000' + str).slice(-length),
};
