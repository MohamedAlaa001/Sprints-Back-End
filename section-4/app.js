// import Pusher from './pusher.js';

var pusher;
var timerCounter;
var updateTimer;
// pusher.sendMessage();
// pusher.unSubscribe();

const login = (e) => {
  e.preventDefault();
  const form = document.querySelector('.login-form');

  if (form.group.value.trim() === '' || form.user.value.trim() === '') {
    return alert('Both group and Username are required');
  }
  const id = uuidv4();

  const user = {
    id,
    name: form.user.value.trim(),
  };
  localStorage.setItem('userId', id);

  pusher = new PusherJS(user);
  pusher.subscribe(form.group.value.trim());
  handleTimer();

  console.log('login');
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('chat-window').style.display = 'flex';
  pusher.getChannelInfo();
  updateTimer = setInterval(
    (obj) => {
      obj.getChannelInfo();
    },
    20000,
    pusher
  );
};

const logout = () => {
  clearInterval(updateTimer);
  pusher.unSubscribe();
};

const sendMessage = (e) => {
  e?.preventDefault();
  console.log('send message');
  const form = document.querySelector('.chat-form');

  const message = form.message.value.trim();

  if (message === '') {
    alert('Cannot send an empty message');
    return;
  }

  pusher.sendMessage(message);
  // reset counter
  timerCounter = 59;
};

const handleChatNewLine = (el) => {
  el.value = el.value + '\r\n';
};

// Dom listeners
const textElement = document.querySelector('.chat-textArea');
const btnTxtAreaElement = document.querySelector('.chat-textArea-button');
var isAltPressed = false;

const isValidText = (el) => {
  if (el.value.trim().length > 0) {
    return true;
  } else {
    return false;
  }
};

textElement.addEventListener('keydown', (e) => {
  if (e.altKey) {
    isAltPressed = true;
  }

  if (e.key === 'Enter' && isAltPressed) {
    handleChatNewLine(textElement);
  }

  if (e.key === 'Enter' && !isAltPressed) {
    e.preventDefault();
    isValidText(textElement) && sendMessage();
  }
});

textElement.addEventListener('keyup', (e) => {
  isValidText(textElement)
    ? (btnTxtAreaElement.disabled = false)
    : (btnTxtAreaElement.disabled = true);

  if (e.altKey) {
    isAltPressed = false;
  }
});

const handleTimer = () => {
  const timer = document.getElementById('timer');
  timerCounter = 59;
  timer.innerHTML = `(00:${timerCounter})`;
  setInterval(() => {
    if (timerCounter === 0) {
      pusher.unSubscribe();
    }
    timer.innerHTML = `(00:${timerCounter})`;
    timerCounter--;
  }, 1000);
};
