import openSocket from 'socket.io-client';

window.openSocket = openSocket;
const socket = openSocket('emmanuelhellobooks.herokuapp.com/notifications');
if (window.localStorage.role === 'admin') {
  socket.emit('admin');
}

export default socket;
