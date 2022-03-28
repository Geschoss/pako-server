import WebSocket from 'ws';

export class Client implements Socket {
  constructor(
    private socket: WebSocket.WebSocket,
    private app: ApplicationI
  ) {}
  address() {
    // @ts-ignore
    return this.socket._socket.address();
  }
  send(data: Message) {
    const message = JSON.stringify(data);
    this.app.logger.log({ type: 'response', message });
    this.socket.send(message);
  }

  onClose(cb: () => void) {
    this.socket.on('close', cb);
  }
}
