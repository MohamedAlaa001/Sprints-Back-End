const login = (e) => {
  e.preventDefault();
  console.log('login');
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('chat-window').style.display = 'flex';
};

const logout = () => {
  console.log('logout');
  document.getElementById('chat-window').style.display = 'none';
  document.getElementById('login-page').style.display = 'block';
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
