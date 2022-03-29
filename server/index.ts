import { createApp } from './lib/framework';
import { logger } from './lib/framework/logger';

import Cards from './domains/cards/api';

const port = parseInt(process.env.PORT || '8000', 10);

const main = async () => {
  const app = createApp({ port, logger, process });

  await app.addDomain(Cards);
  await app.start();
};

main();
