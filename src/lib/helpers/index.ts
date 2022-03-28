export const array = {
  range: <U = number>(
    size: number,
    mapfn: (v: unknown, k: number) => U = (_, i) => i
  ) => Array.from({ length: size }, mapfn),

  make: <U>(mapfn: (v: any, k: number) => U, length: number) =>
    Array.from({ length }, mapfn),
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
