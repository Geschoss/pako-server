declare module 'readline' {
  export function emitKeypressEvents(
    stream: NodeJS.ReadableStream,
    interface?: ReadLine
  ): void;
}
