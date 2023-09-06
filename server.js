const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const players = {};

app.use(express.static('public')); // Servir arquivos estáticos da pasta 'public'

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('playerMoving', (playerId) => {
        socket.broadcast.emit('otherPlayerMoving', playerId);
    });
    
    socket.on('playerStoppedMoving', (playerId) => {
        socket.broadcast.emit('otherPlayerStoppedMoving', playerId);
    });
    

    socket.on('updatePlayer', (playerData) => {
        players[socket.id] = playerData;
        io.emit('playersUpdate', players);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        delete players[socket.id];
        io.emit('playersUpdate', players);
    });

    // No lado do servidor


});

server.listen(8000, () => {
    console.log('Server listening on port 8000');
});
