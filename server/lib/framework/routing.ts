export class Routing {
  private app: ApplicationI;
  private routes: Map<string, ApiMethod>;

  constructor(app: ApplicationI) {
    this.app = app;
    this.routes = new Map<string, ApiMethod>();
  }

  find(methodName: string) {
    return this.routes.get(methodName);
  }

  async add({ name, api }: Domain) {
    // TODO validate dublicate
    const eventsMap = await api(this.app.context);

    Object.entries(eventsMap).forEach(([eventName, method]) => {
      this.routes.set(`${name}:${eventName}`, method);
    });
  }
}
