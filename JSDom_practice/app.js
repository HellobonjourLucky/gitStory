const express = require('express');
const app = express();
const ejs = require("ejs");
const server =  require('http').createServer(app);

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render('home');
    // res.sendFile(__dirname + '/index.html');
});


const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort('/dev/cu.usbmodem142401',{ 
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
    const myArray = data.split(',');
    io.emit('data', myArray); 
}); 


server.listen(4000, () => {
    console.log("server is listening...");
})

// app.listen(4000, function() {
//     console.log("Server started on port 4000");
//   });