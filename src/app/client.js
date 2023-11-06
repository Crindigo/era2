export class Client
{
  constructor() {
    this.callbacks = {};
    this.requestIndex = 0;
    this.onSync = null;

    // webpack supports workers natively using this syntax now
    this.worker = new Worker(new URL("./../backend/index.js", import.meta.url));
    this.worker.onmessage = ev => this.handleMessage(ev);
  }

  send(msg) {
    this.worker.postMessage(msg);
  }

  async start() {
    return this.request('start', {});
  }

  async request(api, params) {
    return new Promise((resolve, reject) => {
      this.requestIndex++;
      const id = this.requestIndex;
      this.callbacks[id] = data => {
        resolve(data);
      };
      this.send({id, api, params})
    });
  }

  handleMessage(ev) {
    const data = ev.data;

    // Handle responses from requests
    if ( data.id ) {
      const requestId = data.id;
      const response = data.response;
      if (this.callbacks[requestId]) {
        this.callbacks[requestId](response);
        delete this.callbacks[requestId];
      }
    }

    // Handle data model updates
    if ( data.sync && this.onSync ) {
      this.onSync(data.sync);
    }
  }
}