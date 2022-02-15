let serial;
const portName = '/dev/cu.usbmodem141401';
let inData;

let bgImage, system_text, grid_0, grid_1, grid_2, grid_3;
const width_array = [0, 50, 100, 150, 200, 250, 300];
const height_array = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
const rotate_deg = [0, 90, 180, 270];

function preload() {
  bgImage = loadImage('assets/bgImage.png');
  system_text = loadImage('assets/system_text.png');
  grid_0 = loadImage('assets/grid_0.png');
  grid_1 = loadImage('assets/grid_1.png');
  grid_2 = loadImage('assets/grid_2.png');
  grid_3 = loadImage('assets/grid_3.png');
  
}

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
  inData = Number(serial.read());
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

function serialEvent() {
  inData = Number(serial.read());
  console.log(inData);
}


function setup() {
  createCanvas(400, 600);
  background(255);

  //Serial Run
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  // let portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  // serial.open(portName);

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);

  serial.list();                      // list the serial ports
  let options = { baudrate: 9600}; // change the data rate to whatever you wish
  serial.open(portName, options);

  
  // image(bgImage, 0, 0, 400, 600);
  // image(system_text, 0, 0, 400, 600);

  
  // for(var i = 0; i < 12; i++){
  //   imageMode(CENTER);
    
  //   translate(width / 2, height / 2);
  //   rotate(PI / 2.0);
  //   image(grid_0, random(width_array), random(height_array));
  //   image(grid_1, random(width_array), random(height_array));
    
  //   translate(width / 2, height / 2);
  //   rotate(PI / 1.0);
  //   image(grid_2, random(width_array), random(height_array));
  //   image(grid_3, random(width_array), random(height_array));
    
  //   image(bgImage, 0, 0, 400, 600);
  // }
  
}




function draw() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 50);
}