import { createServer } from './server';
import { Routing } from './routing';

type Conf = {
  port: number;
  logger?: Console;
};

export class Application implements ApplicationI {
  port: number;
  logger: Console;
  connections: Set<Socket>;
  routing: Routing;

  context: Context;

  constructor({ port, logger }: Conf) {
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

  async omMessage(message: Message, socket: Socket) {
    this.logger.log({ message });
    const { method, payload } = message;
    const api = this.routing.find(method);

    if (!api) {
      this.logger.log(`Can't find api with name ${method}`);
      return;
    }

    await api(payload, socket);
  }

  async addDomain(domain: Domain) {
    await this.routing.add(domain);
  }
}

export const createApp = (conf: Conf) => {
  return new Application(conf);
};
