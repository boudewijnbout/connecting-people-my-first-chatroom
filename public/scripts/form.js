let socket = io();
let message = document.querySelector('li');
let messages = document.querySelector('section ul');
let input = document.querySelector('input');
let form = document.querySelector('form');
let userName = prompt('Kies een gebruikersnaam:');

// Logics
form.addEventListener('submit', sendMessage);

/**
 * Submit create project form with form data to API.
 *
 * @function sendMessage
 * @param {e} event Submit event of the form.
 */
 function sendMessage(e) {
    e.preventDefault();
    
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
}

appendMessage(`You joined as: ${userName}`);

socket.emit('new-user', userName);

socket.on('user-connected', (userName) => {
    appendMessage(`${userName} has connected.`);
})

function appendMessage(message) {;
    messages.innerText = message;
    // messages.append(message);
}

socket.on('message', message => {
    messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }));
});