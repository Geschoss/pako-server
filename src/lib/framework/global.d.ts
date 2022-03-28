type ANY_TYPE = any;

declare interface ApplicationI {
  port: number;
  logger: Console;
  connections: Set<ANY_TYPE>;
  context: Context;
  start(): Promise<void>;
  addDomain(domain: Domain): Promise<void>;
  omMessage(payload: Message, socket: ANY_TYPE): void;
}

declare type Context = {
  logger?: Console;
};
declare interface BusI {
  on: (eventName: string, method: ApiMethod) => BusI;
}

declare type Domain = {
  name: string;
  api(context: Context): Promise<Record<string, ApiMethod>>;
};

declare interface ApiMethod {
  (...args: any[]): Promise<void> | void;
}

declare type Message = {
  method: string;
  payload: Record<string, any>;
};

declare type Socket = {
  address(): Record<string, any>;
  send(message: Message): void;
};
