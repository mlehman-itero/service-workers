const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const port = 8080;

// http server
const server = http.createServer(app);

// web sockets server
const wss = new WebSocket.Server({ server });

wss.on('connection', (client) => {
    console.log('connected');
    console.log('client Set length: ', wss.clients.size);

    client.on('message', (message) => {
        client.send(`You sent ${message}`);
    });

    client.send('hello from the server!');

    client.on('close', (client) => {
        console.log('closed');
        console.log('Number of clients: ', wss.clients.size);
    });
});


app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '../../../index.html'));
});

app.get('/sw.js', function(req, res) {
    res.sendFile(path.join(__dirname + '../../../sw.js'));
});

// start server, listen on port
server.listen(port || 8889, () => {
    console.log(`Server started on port ${port}`);
});