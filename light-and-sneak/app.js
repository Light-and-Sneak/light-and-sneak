var express = require('express'),
    app     = express(),
    server  = require('http').Server(app),
    io      = require('socket.io')(server)
;

app.use (express.static ('public'));

server.listen(6969, function (){
  console.log ("SERVER START at http://localhost:6969/");
});

var players = [];

io.on ('connection', function (socket) {
  console.log("connected");

  //Check for a new player, and create an object for it.
  socket.on('new_player', function (data) {
    //Create the new player
    var player = {
      x: data.x,
      y: data.y,
      id: this.id
    }
    //Send this player a list of all the other existing players.
    for (var i = 0; i < players.length; i++) {
      existingPlayer = players[i];
      this.emit('add_player', existingPlayer);
      console.log(existingPlayer);
    }
    players.push (player);
  });

});