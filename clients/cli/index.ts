import WebSocket from 'ws';
import { game } from './game';

const url = 'ws://warm-ridge-86601.herokuapp.com/';
const urlDev = 'ws://localhost:8000';
const socket = new WebSocket(urlDev);

console.log('Loading...');
game.input((payload) =>
  send({
    method: 'cards:message-game',
    payload,
  })
);
on('message', async (message) => await game.update(message));

// Start game
on('open', () =>
  send({
    method: 'cards:start-game',
  })
);
// Stop game
on('close', () => process.exit(0));
process.on('SIGINT', () => {
  send({
    method: 'cards:end-game',
    payload: { gameId: game.gameId },
  });
  process.exit(0);
});
// utils
function send(r: Message) {
  socket.send(JSON.stringify(r));
}
function on(type: string, cb: (message: Message) => void) {
  socket.on(type, (msg) => cb(!msg || JSON.parse(msg.toString())));
}
