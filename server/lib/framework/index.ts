import { createServer } from './server';
import { Routing } from './routing';

type AppOptions = {
  port: number;
  logger?: Console;
};

export class Application implements ApplicationI {
  port: number;
  logger: Console;
  connections: Set<Socket>;
  routing: Routing;

  context: Context;

  constructor({ port, logger }: AppOptions) {
    this.port = port;
    this.logger = logger;
    this.routing = new Routing(this);
    this.connections = new Set();
    this.context = {
      logger,
    };
  }

  async start() {
    createServer(this, { port: this.port });
  }

  async onMessage(message: Message, socket: Socket) {
    const { method, payload } = message;
    const api = this.routing.find(method);

    if (!api) {
      this.logger.log(`Can't find api with name ${method}`);
      return;
    }

    const response = await api(payload, socket);

    if (response) {
      socket.send(response);
    }
  }

  async addDomain(domain: Domain) {
    await this.routing.add(domain);
  }
}

export const createApp = (conf: AppOptions) => {
  return new Application(conf);
};
