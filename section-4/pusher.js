class PusherJS {
  constructor(user) {
    this.pusher = new Pusher('2651c3014d58d8c8017e', {
      cluster: 'eu',
      app_id: '1259308',
      secret: '1f0c5448aaac351a8715',
      // authEndpoint: '/',
    });
    this.channel = null;
    this.auth_key = '2651c3014d58d8c8017e';
    this.app_id = '1259308';
    this.secret = '1f0c5448aaac351a8715';
    this.user = user;
  }

  subscribe(channelName) {
    this.channel = this.pusher.subscribe(channelName);
    this.bindChannels();
  }

  async unSubscribe() {
    await this.pusher.unsubscribe(this.channel.name);
    console.log('logout');
    document.getElementById('chat-window').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
  }

  async getChannelInfo() {
    const timestamp = Date.now() / 1000;
    const signature = CryptoJS.HmacSHA256(
      `GET\n/apps/${this.app_id}/channels/${this.channel.name}\nauth_key=${this.auth_key}&auth_timestamp=${timestamp}&auth_version=1.0&info=subscription_count`,
      this.secret
    );

    const res = await fetch(
      `https://cors.bridged.cc/https://api-eu.pusher.com/apps/${this.app_id}/channels/${this.channel.name}?auth_key=${this.auth_key}&auth_timestamp=${timestamp}&auth_version=1.0&auth_signature=${signature}&info=subscription_count`,
      {
        method: 'GET',
      }
    );
    res.json().then((data) => this.updateUsers(data.subscription_count));
  }

  signMessage(md5, timestamp) {
    return CryptoJS.HmacSHA256(
      `POST\n/apps/${this.app_id}/events\nauth_key=${this.auth_key}&auth_timestamp=${timestamp}&auth_version=1.0&body_md5=${md5}`,
      this.secret
    );
  }

  getMD5(body) {
    return CryptoJS.MD5(JSON.stringify(body));
  }

  getURL(md5, signature, timestamp) {
    return `https://cors.bridged.cc/https://api-eu.pusher.com/apps/${this.app_id}/events?body_md5=${md5}&auth_version=1.0&auth_key=${this.auth_key}&auth_timestamp=${timestamp}&auth_signature=${signature}`;
  }

  async sendMessage(message) {
    const body = {
      data: JSON.stringify({
        message: `${message}`,
        user: { id: `${this.user.id}`, name: `${this.user.name}` },
      }),
      name: 'client-msg',
      channel: this.channel.name,
    };

    const md5 = this.getMD5(body);

    const timestamp = Date.now() / 1000;
    const signature = this.signMessage(md5, timestamp);
    await fetch(this.getURL(md5, signature, timestamp), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  bindChannels() {
    this.channel.bind('client-msg', (data) => this.handleReceiveMessage(data));

    this.channel.bind_global((eventName, data) => {
      console.log(
        `The event ${eventName} was triggered with data ${JSON.stringify(data)}`
      );
      console.log(this.channel);
    });
  }

  updateUsers(count) {
    document.getElementById('users-count').innerHTML = count;
  }

  handleReceiveMessage(data) {
    const chatbox = document.querySelector('.chat-box');
    const userId = localStorage.getItem('userId');

    chatbox.innerHTML =
      chatbox.innerHTML +
      `<div class="${
        userId === data.user.id ? 'chat-item user' : 'chat-item'
      }">${userId === data.user.id ? 'You' : data.user.name}: ${
        data.message
      }</div> 
      `;
  }
}
