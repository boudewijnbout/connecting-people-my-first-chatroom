let socket = io();
let messages = document.querySelector('section ul');
let input = document.querySelector('input');
let form = document.querySelector('form');

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

socket.on('message', message => {
    messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }));
})