var express = require('express'),
    app     = express(),
    server  = require('http').Server(app),
    io      = require('socket.io')(server)
;

app.use (express.static ('public'));

server.listen(6969, function (){
  console.log ("SERVER START at http://localhost:6969/");
});

io.on ('connection', function (socket) {
  console.log("connected");
});