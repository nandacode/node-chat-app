const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.emit('newMessage', {
        from: 'arun@example.com',
        text: 'Hi bro',
        createdAt: 12345
    });

    socket.on('createMessage', (message) => {
        console.log('Create message', message);
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`App started listening on port ${port}`);
});