let particles = [];
const noiseScale = 0.01;
const speed = 1;

let noise_num = 1000;
let bubble_num = 0;
let bubbles = [];

let randomMovement = 5;
let choose_01_array = [];
let choose_02_array = [];
let choose_03_array = [];

let soundArray = [];

let showBubbles = false;
let showNoise = false;



function preload() {
  const water = loadSound('assets/water.mp3');
  const sky = loadSound('assets/sky.mp3');
  const ocean = loadSound('assets/ocean.mp3');
  soundArray = [water, sky, ocean];
}

function setup() {
  createCanvas(600, 600);
  stroke(255);
}

function draw() {
  background(0, 10);

  if(showBubbles){
    makeBubbles();
  }
  if (showNoise){
    makeNoise();
  }
}

function changeBubbleAmount(new_amount) {
  bubble_num = new_amount;
  if (bubble_num > bubbles.length) {
    let amountNewBubbles = bubble_num - bubbles.length;
    for(var b = 0; b < amountNewBubbles; b++){
      // console.log("bubble_num is.. " + bubble_num);
      let x = random(width);
      let y = random(height);
      let r = random(10, 80);
      bubbles[b] = new Bubble(x, y, r);
    } 
  } else if (bubble_num < bubbles.length) {
    let amountDeletedBubbles = bubbles.length - bubble_num;
    for(var b = 0; b < amountDeletedBubbles; b++){
      bubbles.pop();
    }
  }
  showBubbles = true;
}

function changeNoiseAmount(new_amount) {
  noise_num = new_amount;
  if (noise_num > particles.length) {
    let amountNewPARTICLES = noise_num - particles.length;
    for (let i = 0; i<amountNewPARTICLES  ; i++){
      particles.push(createVector(random(width), random(height)));
    }
  } else if (noise_num < particles.length) {
    let amountDeletedPARTICLES = particles.length - noise_num;
    for(var b = 0; b < amountDeletedPARTICLES; b++){
      particles.pop();
    }
  }
  showNoise = true;
}






//console test
function testMePlease() {
  if(choose_03_array.length){
    console.log("Thrid Choice.. " + choose_03_array);
  }else if(choose_02_array.length){
    console.log("Second Choice.. " + choose_02_array);
  }else{
    console.log("First Choice.. " + choose_01_array);
  }
}

//play sound
function mouseClicked(){
  if(choose_01_array.length){
    choose_01_array.forEach(option => {
      soundArray.forEach(sound => {
        if(sound.url == `assets/${option.trim()}.mp3`){
          sound.play();
        }else{
          sound.stop();
        }
      })
    })
  }else{
    soundArray.forEach(sound => {
      sound.stop();
    })
  }

  if(!choose_02_array.length){
    noise_num = 0;
  }
}




//make bubbles
function makeBubbles(){
  push();
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
        b.changeColor(random(100,150));
    }else{
        b.changeColor(0);
    }
  }
  pop();
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
    // stroke(255);
    // strokeWeight(4);
    // noFill();
    noStroke();
    fill(this.brightness, 10);
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
  }
}

//make noise
function makeNoise(){
  push();
  for(let i = 0; i<noise_num; i++){
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = TAU * n; //angle
    p.x += cos(a) * speed;
    p.y += sin(a) * speed;
    if(!onScree(p)){
      p.x = random(width);
      p.y = random(height);
    }
  }
  pop();
}

function mouseReleased(){
  noiseSeed(millis());
}

function onScree(v){
  return v.x >= 0 && v.x < width && v.y >= 0 && v.y < height;
}



