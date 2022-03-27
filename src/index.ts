import { createApp } from './lib/framework';
import { logger } from './lib/framework/logger';

import Cards from './domains/cards/api';

const PORT = 8000;

const main = async () => {
  const app = createApp({ port: PORT, logger });

  await app.addDomain(Cards);
  await app.start();
};

main();
