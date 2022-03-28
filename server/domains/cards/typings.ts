export type BaseState = {
  enter(): void;
  execute(input: string): Screen;
  exit(): void;
};

export type Screen = {
  header: string;
  menu?: Menu[];
  input?: Input;
};

export type Menu = {
  key: string;
  name: string;
};

export type Input = {
  label: string;
};
