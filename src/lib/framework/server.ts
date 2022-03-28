import WebSocket from 'ws';
import { Socket } from '../../typings';

type ServerOptions = {
  port: number;
};

export const createServer = (
  app: ApplicationI,
  { port }: ServerOptions
) => {
  const ws = new WebSocket.Server({ port }, () =>
    app.logger.log(`Server start on: http://localhost:${port}`)
  );

  ws.on('connection', (socket) => {
    app.connections.add(socket);
    app.logger.log(`new connection`, address(socket));
    socket.on('close', () => {
      app.logger.log(`connection close`);
      app.connections.delete(socket);
    });
    socket.on('message', (data) => {
      const payload = bufferToJson(data);
      app.omMessage(payload, socket);
    });
  });

  ws.on('error', (err) => {
    app.logger.error('Server error', err);
  });

  return ws;
};

function bufferToJson(buffer: WebSocket.RawData): Message {
  return JSON.parse(buffer.toString());
}

function address(socket: Socket) {
  // @ts-ignore
  return socket._socket.address();
}
