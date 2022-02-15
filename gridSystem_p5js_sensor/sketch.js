let serial;

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

function setup() {
  let cnv = createCanvas(400, 600);
  cnv.position(windowWidth*0.3, 30);
  background(255);
  
  image(system_text, 0, 0, 400, 600);

  for(var i = 0; i < 12; i++){
    imageMode(CENTER);
    
    translate(width / 2, height / 2);
    rotate(PI / 2.0);
    image(grid_0, random(width_array), random(height_array));
    image(grid_1, random(width_array), random(height_array));
    
    translate(width / 2, height / 2);
    rotate(PI / 1.0);
    image(grid_2, random(width_array), random(height_array));
    image(grid_3, random(width_array), random(height_array));
    
    image(bgImage, 0, 0, 400, 600);
  }

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  let portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem141401");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

  // We are connected and ready to go
  function serverConnected() {
      print("We are connected!");
  }
  
  // Got the list of ports
  function gotList(thelist) {
    // theList is an array of their names
    for (let i = 0; i < thelist.length; i++) {
      // Display in the console
      print(i + " " + thelist[i]);
    }
  }
  
  // Connected to our serial device
  function gotOpen() {
    print("Serial Port is open!");
  }
  
  // Ut oh, here is an error, let's log it
  function gotError(theerror) {
    print(theerror);
  }
  
  // There is data available to work with from the serial port
  function gotData() {
    let currentString = serial.readStringUntil("\r\n");
    // console.log(currentString);
  }

  function draw() {
    // Polling method
    var y=0;
    text("connecting to Arduino", 10, y, 70, 80);
    if (serial.available() > 0) {
      let data = serial.read();
      console.log(data);
      ellipse(50,50,data,data);
    }
  y++;
  }