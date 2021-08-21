const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const TIC = 'X'
const TAC = 'O'

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let playerObject = {};
let playerJoined;
let playersCount = 0;

//First program listener, reached when a player is online
io.sockets.on('connection', (socket) => {

    console.log("got connected")

    playersCount++;             //for splitting players to different games

    initializePlayers(socket);

    //Checking whether opponent os online
    if(getOpponent(socket)){
        socket.emit("get starting position", {mark: playerObject[socket.id].mark})
        getOpponent(socket).emit("get starting position", {mark: playerObject[getOpponent(socket).id].mark})
    }

    //Listener from client when button has been clicked
    socket.on("mark checked", function(data){
        socket.emit("place mark", data)
        getOpponent(socket).emit("place mark", data)
    })

    //When disconnecting contacting the client
    socket.on('disconnect', function () {
        if(getOpponent(socket))
            getOpponent(socket).emit("player left")
    })

});

//Function to fill player object with relevant data
function initializePlayers(socket){
    //creating object for each player
    playerObject[socket.id] = {
        mark: TIC,
        opponent: playerJoined,
        socket: socket
    }
    if(playersCount % 2 === 0){
        playerObject[playerJoined].opponent = socket.id;
        playerObject[socket.id].mark = TAC;
        playerJoined = null;
    }
    else
        playerJoined = socket.id;
}

//Returning whether opponent is online or not
function getOpponent(socket) {
    if (!playerObject[socket.id].opponent) {
        return;
    }
    return playerObject[playerObject[socket.id].opponent].socket;
}

http.listen(3000, () => {
    console.log('listening on *:3000');
});