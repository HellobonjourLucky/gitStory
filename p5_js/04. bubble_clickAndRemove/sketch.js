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

function mousePressed(){
  for(var i = bubbles.length-1; i >= 0; i--){
    if(bubbles[i].contains(mouseX, mouseY)){
      bubbles.splice(i,1);
    }
  }
}

function draw() {
  background(0);

  for(var i = 0; i < bubbles.length; i++){
    if(bubbles[i].contains(mouseX, mouseY)){
      bubbles[i].changeColor(255);
    }else{
      bubbles[i].changeColor(0);
    }
    bubbles[i].move();
    bubbles[i].show();
  }
}


