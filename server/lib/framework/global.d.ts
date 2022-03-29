type ANY_TYPE = any;

declare interface ApplicationI {
  port: number;
  logger: Console;
  context: Context;
  start(): Promise<void>;
  addDomain(domain: Domain): Promise<void>;
  onMessage(payload: Message, socket: Socket): void;
}

declare type Context = {
  logger?: Console;
  paths: Paths;
};

type Paths = {
  readonly root: string;
};

declare interface BusI {
  on: (eventName: string, method: ApiMethod) => BusI;
}

declare type Domain = {
  name: string;
  api(context: Context): Promise<Record<string, ApiMethod>>;
};

declare interface ApiMethod {
  (payload: Message['payload'], socket: Socket):
    | Promise<void | Message>
    | void
    | Message;
}

declare type Message = {
  method: string;
  payload?: Record<string, any>;
};

declare type Socket = {
  address(): Record<string, any>;
  send(message: Message): void;
  onClose(cb: () => void): void;
};
