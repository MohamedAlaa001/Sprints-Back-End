class Pusher {
  constructor() {
    this.pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER,
    });
    this.channel = null;
  }

  static subscribeUser = () => {};

  static unSubscribeUser = () => {};
}

module.exports = Pusher;
