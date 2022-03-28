import { game } from './game';

export default {
  name: 'cards',
  api: async ({ logger }: Context) => {
    const rooms = new Map<number, string>();

    return {
      'start-game': (_: any, socket: Socket) => {
        rooms.set(1, 'hello');

        socket.send({
          method: 'game-started',
          payload: { size: rooms.size },
        });
      },
      'end-game': (_: any, socket: Socket) => {
        rooms.delete(1);

        socket.send({
          method: 'game-ended',
          payload: { size: rooms.size },
        });
      },
    };
  },
};
