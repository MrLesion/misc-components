const socket = new WebSocket('ws://127.0.0.1:5000');

socket.addEventListener('open', (event) => {
    console.log('WebSocket connection opened:', event);
});

socket.addEventListener('message', (event) => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += '<p>' + event.data + '</p>';
});

socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed:', event);
});

function sendMessage() {
    const inputElement = document.getElementById('input');
    const message = inputElement.value;
    socket.send(message);
    inputElement.value = '';
}