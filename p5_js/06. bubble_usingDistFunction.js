let bubble1;
let bubble2;

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 200);
  bubble2 = new Bubble(300, 200);
}

function draw() {
  background(0);

  let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
  if(d < bubble1.r + bubble2.r){
    background(200, 0, 100);
  }
  
  bubble1.show();
  bubble2.show();
  bubble1.move();
  bubble2.move();
  
}


class Bubble {
  //r=50 is default value, 
  //if we didn't transfer any value from an instant
  constructor(x, y, r=50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    // noFill();
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
  
  changeColor(brightness){
    this.brightness = brightness;
  }
  
  contains(x, y){
    let d = dist(x, y, this.x, this.y);
    if(d < this.r){
      return true;
    }else{
      return false;
    }
  }
}

