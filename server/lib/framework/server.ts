import WebSocket from 'ws';
import { Client } from './client';

type ServerOptions = {
  port: number;
};

export const createServer = (
  app: ApplicationI,
  { port }: ServerOptions
) => {
  const ws = new WebSocket.Server({ port }, () =>
    app.logger.log(`Server start on: ws://localhost:${port}`)
  );

  ws.on('connection', (socket) => {
    const client = new Client(socket);
    app.connections.add(socket);
    app.logger.log(`new connection`, client.address());

    socket.on('close', () => {
      app.logger.log(`connection close`);
      app.connections.delete(client);
    });

    socket.on('message', (data) => {
      const payload = bufferToJson(data);
      app.omMessage(payload, client);
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
