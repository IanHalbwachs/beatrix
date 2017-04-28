var http = require('http');
var server = http.createServer();

var volleyball = require('volleyball');
var express = require('express');
var app = express();

server.on('request', app);

server.listen(3000, function () {
  console.log('The server is listening on port 3000!');
});

app.use(express.static(__dirname + '/public'));
app.use(volleyball);

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
