let bubbles = [];

function setup() {
  createCanvas(600, 400);
  let x = random(width);
  let y = random(height);
  let r = random(10, 50);
  for(var i = 0; i < 5; i++){
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
  
}
//function mousePressed() is global function 
//so it runs wherever I clicked. 
function mousePressed(){
  for(var i = 0; i < bubbles.length; i++){
    bubbles[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  background(0);

  for(var i = 0; i < bubbles.length; i++){
    bubbles[i].move();
    bubbles[i].show();
  }
}


