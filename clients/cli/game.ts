import { Page } from '../../server/domains/cards/typings';
import { reacli } from './reacli';

type CB = (payload: Message['payload']) => void;

export const game = {
  gameId: -1,
  notify: (() => {}) as CB,
  update: async ({ method, payload }: Message) => {
    const { page, gameId } = payload;
    switch (method) {
      case 'game-started':
        game.gameId = gameId;
        await game.render(page);
        break;
      case 'message-game':
        await game.render(page);
        break;
    }
  },
  render: async (page: Page) => {
    const { header, menu, input, body } = page;
    reacli.clear();
    reacli.write(header);
    reacli.menu(menu);
    reacli.body(body);
    
    const userInput = await reacli.input(input);
    game.notify({
      gameId: game.gameId,
      input: userInput,
    });
  },
  input: (cb: CB) => {
    game.notify = cb;
  },
};
