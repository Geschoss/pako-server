import WebSocket from 'ws';

const url = 'ws://warm-ridge-86601.herokuapp.com/';
const urlDev = 'ws://localhost:8000';
const socket = new WebSocket(urlDev);
socket.on('open', open);
socket.on('close', exit);
socket.on('message', (msg) => message(JSON.parse(msg.toString())));
const events = {
  end: 'cards:end-game',
  start: 'cards:start-game',
  message: 'cards:message-game',
};
const client = {
  send(r: Record<string, any>) {
    socket.send(JSON.stringify(r));
  },
};
function message(data: Message) {
  console.log({ data });
}
function open() {
  client.send({
    method: events.start,
  });
}
function exit() {
  process.exit(0);
}
