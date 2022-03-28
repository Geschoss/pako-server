import { random } from '../../lib/helpers';
import { createGame, Game } from './game';

type Value = { game: Game; creationDate: Date; socket: Socket };
const domain: Domain = {
  name: 'cards',
  api: async ({ logger }) => {
    const rooms = new Map<number, Value>();

    return {
      'start-game': (_, socket) => {
        const gameId = random.int(0, 100000);
        const game = createGame();

        rooms.set(gameId, { game, creationDate: new Date(), socket });

        socket.onClose(() => {
          rooms.delete(gameId);
        });

        return {
          method: 'game-started',
          payload: { gameId },
        };
      },
      'end-game': ({ gameId }: { gameId: number }) => {
        rooms.delete(gameId);

        return {
          method: 'game-ended',
          payload: { size: rooms.size },
        };
      },
      'message-game': ({ gameId }: { gameId: number }) => {
        const game = rooms.get(gameId);

        // const result = game.update(message);

        // logger.log({ result });
      },
    };
  },
};

export default domain;
