class Bubble {
  constructor(x, y, r) {
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
  
  clicked(x, y){
    let d = dist(x, y, this.x, this.y);
    //if the distance between 
    //the center of circle and mouseCliked postion 
    //is smaller than the radius, log "cliclked"
    if(d < this.r){
      console.log("clicked");
      this.brightness = 255;
    }
  }
}