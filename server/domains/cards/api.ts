import { random } from '../../lib/helpers';
import { FileStorage } from './lib/storage';
import { createDeck } from './deck';
import { createGame, Game } from './game';
import { strategies } from './strategies';

type Room = { game: Game; creationDate: Date; socket: Socket };
type UserMessage = { gameId: number; input: string };

const domain: Domain = {
  name: 'cards',
  api: async ({ logger, paths }) => {
    const rooms = new Map<number, Room>();
    const storage = new FileStorage(`${__dirname}/db/dictionary.txt`);
    const deck = await createDeck(storage);

    return {
      'start-game': (_, socket) => {
        const gameId = random.int(0, 100000);
        const game = createGame(deck, strategies, logger);
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
