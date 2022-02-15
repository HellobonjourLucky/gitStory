let bubbles = [];

function setup() {
  createCanvas(600, 400);
}

function mouseDragged(){
  let r = random(10, 50);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
}

function draw() {
  background(0);

  // for(let bubble of bubbles){
  //   bubble.move();
  //   bubble.show();
  // }

  for(var i = 0; i < bubbles.length; i++){
    bubbles[i].move();
    bubbles[i].show();
  }
}


