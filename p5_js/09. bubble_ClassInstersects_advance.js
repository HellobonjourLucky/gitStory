let bubbles = [];
// let unicorn;

function setup() {
  createCanvas(600, 400);
  for(var i = 0; i < 10; i++){
    let x = random(width);
    let y = random(height);
    let r = random(10, 50);
    bubbles[i] = new Bubble(x, y, r);
  }
  // unicorn = new Bubble(0,0,50);
  
}

function draw() {
  background(0);
  
  // unicorn.x = mouseX;
  // unicorn.y = mouseY;
  // unicorn.r = 40;
  // unicorn.show();


  for(let b of bubbles){
    b.show();
    b.move();
    let overlapping = false;
    for(let other of bubbles){
        if(b !== other && b.intersects(other)){
            overlapping = true;
        }
    }
    if(overlapping){
        b.changeColor(255);
    }else{
        b.changeColor(0);
    }
  }  
}


class Bubble {
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
  
  intersects(otherBubble){
    let d = dist(this.x, this.y, otherBubble.x, otherBubble.y);
    return (d < this.r + otherBubble.r);
    // if(d < this.r + otherBubble.r){
    //   return true;
    // }else{
    //   return false;
    // }
  }
}

