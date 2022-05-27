// Elements
let socket = io();
let message = document.querySelector('li');
let messages = document.querySelector('section ul');
let input = document.querySelector('input');
let form = document.querySelector('form');
let userName = prompt('Kies een gebruikersnaam:');

// Logics
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let messageValue = input.value;
    sendMessage(`Ik: ${messageValue}`);
    socket.emit('send-message', messageValue);
    input.value = '';
});

sendMessage(`Chat binnengekomen als: ${userName}`);

// Socket Functions
socket.emit('new-user', userName);

socket.on('user-connected', (userName) => {
    sendMessage(`${userName} is de chat binnengekomen`);
});

socket.on('chat-message', (data) => {
    receivedMessage(`${data.name}: ${data.messageValue}`);
})

// Functions
/**
 * Send a message into the chat
 *
 * @function sendMessage
 * @param {message} string Message that has been send
 */
function sendMessage(message) {
    let messageEl = document.createElement('li');
    messageEl.classList.add('message-sent');
    messageEl.innerText = message;
    messages.append(messageEl);
}

/**
 * Receives a message into the chat
 *
 * @function receivedMessage
 * @param {message} string Message that has been received
 */
function receivedMessage(message) {
    let receivedMessageEl = document.createElement('li');
    receivedMessageEl.classList.add('message-received');
    receivedMessageEl.innerText = message;
    messages.append(receivedMessageEl);
}