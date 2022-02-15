const express = require('express');
const app = express();
const server =  require('http').createServer(app);

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;

// var fs = require('fs');
// var index = fs.readFileSync('index.html');

// app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('/dev/cu.usbmodem141401',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);


const io = require('socket.io')(server, {
    cors: {origin: ['http://localhost:4000']}
});

io.on('connection', function(socket) {
    console.log('Node is listening to port');
});

parser.on('data', function(data) {
    console.log('Received data from port: ' + data);
    io.emit('data', data); 
}); 


server.listen(4000, () => {
    console.log("server is listening...");
})