import { random } from '../../lib/helpers';
import { createGame, Game } from './game';

type Room = { game: Game; creationDate: Date; socket: Socket };
type UserMessage = { gameId: number; input: string };
const domain: Domain = {
  name: 'cards',
  api: async ({ logger }) => {
    const rooms = new Map<number, Room>();

    return {
      'start-game': (_, socket) => {
        const gameId = random.int(0, 100000);
        const game = createGame();
        const page = game.update('');

        rooms.set(gameId, { game, creationDate: new Date(), socket });

        socket.onClose(() => {
          rooms.delete(gameId);
        });

        return {
          method: 'game-started',
          payload: { gameId, page },
        };
      },
      'end-game': ({ gameId }: UserMessage) => {
        rooms.delete(gameId);

        return {
          method: 'game-ended',
          payload: { gameId },
        };
      },
      'message-game': ({ gameId, input }: UserMessage) => {
        const { game } = rooms.get(gameId);
        const page = game.update(input);

        return {
          method: 'message-game',
          payload: { gameId, page },
        };
      },
    };
  },
};

export default domain;
