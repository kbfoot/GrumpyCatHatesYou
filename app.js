var restify = require('restify');
var builder = require('botbuilder');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//Set up chat 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
http.listen(port, function () {
    console.log('listening on ' + port);
});

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'grumpycathatesyou', appSecret: '1ca1d792f92042da9a113de64703e49d' });
bot.add('/', function (session) {
    session.send('NOPE');
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


