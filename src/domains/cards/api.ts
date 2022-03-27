import { Socket } from '../../typings';
import { game } from './game';

export default {
  name: 'cards',
  api: async ({ logger }: Context) => {
    return {
      'start-game': (payload: any, socket: Socket) => {
        socket.send(JSON.stringify(payload));
      },
      'end-game': () => {},
    };
  },
};
