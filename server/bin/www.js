// Express setup
import http from 'http';
import io from 'socket.io';
import app from '../config/app';
import socket from '../config/socket';

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// setup http
const server = http.createServer(app);
server.listen(port);
const ioObj = io.listen(server).of('/notifications');
(socket)(ioObj);

process.stdout.write(`Express app started on port ${port} \n`);

