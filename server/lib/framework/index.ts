import { createWSServer } from './server';
import { Routing } from './routing';

type AppOptions = {
  port: number;
  logger?: Console;
  process: NodeJS.Process;
};

const createPaths = (process: NodeJS.Process) => ({
  root: process.cwd(),
});

export class Application implements ApplicationI {
  port: number;
  logger: Console;
  routing: Routing;

  context: Context;

  constructor({ port, logger, process }: AppOptions) {
    this.port = port;
    this.logger = logger;
    this.routing = new Routing(this);
    this.context = {
      logger,
      paths: createPaths(process),
    };
  }

  async start() {
    createWSServer(this, { port: this.port });
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

export const createApp = (conf: AppOptions) => new Application(conf);
