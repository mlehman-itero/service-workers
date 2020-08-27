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

    client.on('message', (message) => {
        client.send(`you sent ${message}`);
    });

    client.on('close', (client) => {
        console.log('closed');
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