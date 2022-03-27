'use strict';

const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:8000/');

socket.on('message', (message) => {
  const data = JSON.parse(
    message.toString()
  );
  console.log({ data });
});

socket.on('close', () => {
  process.exit(0);
});

let i = 1;
setInterval(() => {
  const res = JSON.stringify({
    method: 'cards:start-game',
    payload: { name: 'Pavel', count: i },
  });
  i++;
  socket.send(res);
}, 1000);
