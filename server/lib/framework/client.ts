import WebSocket from 'ws';

export class Client implements Socket {
  constructor(private socket: WebSocket.WebSocket) {}
  address() {
    // @ts-ignore
    return this.socket._socket.address();
  }
  send(message: Message) {
    this.socket.send(JSON.stringify(message));
  }

  onClose(cb: () => void) {
    this.socket.on('close', cb);
  }
}
