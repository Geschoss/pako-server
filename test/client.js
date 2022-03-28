'use strict';
const WebSocket = require('ws');

const url = 'ws://warm-ridge-86601.herokuapp.com/';
const urlDev = 'ws://localhost:8000';
const socket = new WebSocket(urlDev);
socket.on('open', main);
socket.on('close', exit);
socket.on('message', onMessage);

function onMessage(message) {
  const data = JSON.parse(message.toString());
  console.log({ data });
}

function main() {
  let i = 1;

  setTimeout(() => {
    const res = JSON.stringify({
      method: 'cards:start-game',
      payload: { name: 'Pavel', count: i },
    });
    i++;
    socket.send(res);
  }, 1000);

  setTimeout(() => {
    const res = JSON.stringify({
      method: 'cards:end-game',
      payload: { name: 'Pavel', count: i },
    });
    i++;
    socket.send(res);
  }, 5000);
}

function exit() {
  process.exit(0);
}
