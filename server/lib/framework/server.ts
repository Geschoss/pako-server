import WebSocket from 'ws';
import { Client } from './client';

type ServerOptions = {
  port: number;
};

export const createWSServer = (
  app: ApplicationI,
  { port }: ServerOptions
) => {
  const connections = new Set<Socket>();
  const ws = new WebSocket.Server({ port }, () =>
    app.logger.log(`Server start on ws://localhost:${port}`)
  );

  ws.on('connection', (socket) => {
    const client = new Client(socket, app);
    connections.add(client);
    app.logger.log(`new connection`, client.address());
    // TODO выпилить
    app.logger.log(`connections: `, connections.size);

    socket.on('close', () => {
      connections.delete(client);
      app.logger.log(`connection close`);
      app.logger.log(`connections: `, connections.size);
    });

    socket.on('message', (data) => {
      const message = bufferToJson(data);
      app.logger.log({ type: 'request', message });
      app.onMessage(message, client);
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
