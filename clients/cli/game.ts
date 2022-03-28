import { Screen } from '../../server/domains/cards/typings';
import { reacli } from './reacli';

type CB = (payload: Message['payload']) => void;

export const game = {
  gameId: -1,
  notify: (() => {}) as CB,
  update: async ({ method, payload }: Message) => {
    const { screen, gameId } = payload;
    switch (method) {
      case 'game-started':
        game.gameId = gameId;
        await game.render(screen);
        break;
      case 'message-game':
        await game.render(screen);
        break;
    }
  },
  render: async (screen: Screen) => {
    const { header, menu, input } = screen;
    reacli.clear();
    reacli.write(header);
    reacli.renderMenu(menu);
    const userInput = await reacli.renderInput(input);

    game.notify({
      gameId: game.gameId,
      input: userInput,
    });
  },
  input: (cb: CB) => {
    game.notify = cb;
  },
};
