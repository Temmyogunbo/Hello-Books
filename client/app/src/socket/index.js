import openSocket from 'socket.io-client';

window.openSocket = openSocket;
console.log(window.localStorage.role);

const socket = openSocket('http://localhost:8000/notifications');
if (window.localStorage.role === 'admin') {
  socket.emit('admin');
}

export default socket;
