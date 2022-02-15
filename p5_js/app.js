//adjusting conditions ORDER!
function setup() {
    createCanvas(400, 400);
  }

  function draw() {
    background(0);
    noFill();
    stroke(255);
    strokeWeight(4);
    if(mouseX > 250){
      ellipse(150, 150, 100, 100);
    }else if(mouseX > 150){
      rect(150, 150, 100, 100);
    }else if(mouseX > 50){
      line(0, 0, width, height);
    }else{
      point(width/2, height/2);
    }
  }

//bouncing ball
//using && condition
let x = 0;
let speed = 3;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(225);
  if(x+20 > width){
    speed = -3;
  }
  if(x < 20){
    speed = 3;
  }

  // if(x > width || x < 0){
  //   speed = speed * -1;
  // }
  x += speed;
  ellipse(x, 200, 40);
}

//switch ON/OFF
//toggle value
let switchOn = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if(switchOn){
    background(0, 255, 0);
  }else{
    background(0);
  }

  stroke(255);
  strokeWeight(4);
  noFill();

  if(mouseX < 350 && mouseX > 250 && mouseY>150 && mouseY<250){
    fill(255, 0, 200);
  }

  rectMode(CENTER);
  rect(300, 200, 100, 100);
}

function mousePressed(){
    if(mouseX < 350 && mouseX > 250 && mouseY>150 && mouseY<250){
      switchOn = !switchOn;
    }
  }


  //Nested LOOPS
  function setup() {
    createCanvas(600, 400);
  }

  function draw() {
    background(0);
    stroke(255);
    strokeWeight(2);

    for(var x = 0; x <= width; x += 50){
      for(var y = 0; y <= height; y += 50){
        fill(random(255), 0, random(255));
        ellipse(x, y, 50, 50);
      }
    }
  }

//Function Modulate
//Bouncing ball
var ball = {
    x: 300,
    y: 300,
    xspeed: 3,
    yspeed: -4,
  }

  function setup() {
    createCanvas(600, 400);
  }

  function draw() {
    background(0);

    display();
    move();
    bounce();
  }
  function bounce(){
    if(ball.x < 0 || ball.x > width){
      ball.xspeed = ball.xspeed * -1;
    }
    if(ball.y < 0 || ball.y > height){
      ball.yspeed = ball.yspeed * -1;
    }
  }

  function move(){
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;
  }

  function display(){
    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(ball.x, ball.y, 20, 20);
  }
  


  //Making CLASS
  //bouncing bubble
  let bubble1, bubble2;

class Bubble  {
  constructor(){
    this.x = 300;
    this.y = 300;
    this.xspeed = 3;
    this.yspeed = -4;
  }
  move(){
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  show(){
  noFill();
  stroke(255);
  strokeWeight(4);
  ellipse(this.x, this.y, 20, 20);
  }

  bounce(){
    if(this.x < 0 || this.x > width){
      this.xspeed = this.xspeed * -1;
    }
    if(this.y < 0 || this.y > height){
      this.yspeed = this.yspeed * -1;
    }
  }
}

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble();
  // bubble2 = new Bubble();
}

function draw() {
  background(0);
  bubble1.show();
  bubble1.move();
  bubble1.bounce();

  // bubble2.show();
  // bubble2.move();
  // bubble2.bounce();
}
