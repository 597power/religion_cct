//
// # Made By Jonathan Marcello
//
// A fun team game for my CCT
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var connectCounter = 0;

var holder = 0;
var team1 = 0;
var team2 = 0;
var team3 = 0;
var team4 = 0;
var team5 = 0;
var team6 = 0;

io.on('connection', function (socket) {
    connectCounter++; 
    io.sockets.emit('con', connectCounter);
    holder++;
    sendTeamsToClients();
    
    function sendTeamsToClients() {
      io.sockets.emit('addToTeam', 0, holder);
      io.sockets.emit('addToTeam', 1, team1);
      io.sockets.emit('addToTeam', 2, team2);
      io.sockets.emit('addToTeam', 3, team3);
      io.sockets.emit('addToTeam', 4, team4);
      io.sockets.emit('addToTeam', 5, team5);
      io.sockets.emit('addToTeam', 6, team6);
    }

    socket.on('disconnect', function() { 
      connectCounter--;
    });
    
    socket.on('addToTeamList', function(name){
      io.sockets.emit('addToTeamList', name);
    });
    
    socket.on('discon', function(lastTeam){
      connectCounter--;
      switch(lastTeam) {
        case 0:
          if(holder >= 1) {
            holder--;
          }
          break;
        case 1:
          team1--;
          break;
        case 2:
          team2--;
          break;
        case 3:
          team3--;
          break;
        case 4:
          team4--;
          break;
        case 5:
          team5--;
          break;
        case 6:
          team6--;
          break;
      }
      io.sockets.emit('discon', lastTeam);
    });
    
    socket.on('joinTeam', function(team, lastTeam){
      switch(team) {
        case 1:
          team1++;
          break;
        case 2:
          team2++;
          break;
        case 3:
          team3++;
          break;
        case 4:
          team4++;
          break;
        case 5:
          team5++;
          break;
        case 6:
          team6++;
          break;
      }
      switch(lastTeam) {
        case 0:
          if(holder >= 1) {
            holder--;
          }
          break;
        case 1:
          team1--;
          break;
        case 2:
          team2--;
          break;
        case 3:
          team3--;
          break;
        case 4:
          team4--;
          break;
        case 5:
          team5--;
          break;
        case 6:
          team6--;
          break;
      }
      
      sendTeamsToClients();
    });
});



server.listen(process.env.PORT);