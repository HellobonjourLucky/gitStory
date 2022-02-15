PImage klimt;
PImage smaller;
int w, h;
PImage[] allImages;
float[] brightness;
PImage[] brightImages;

int scl = 10;
void setup(){
  size(541,960);
  klimt = loadImage("klimt.jpg");
  
  File[] files = listFiles(sketchPath("data/photos"));
  //printArray(files);
  //allImages = new PImage[9];
  allImages = new PImage[files.length -1];
  brightness = new float[allImages.length];
  //println(allImages);
  brightImages = new PImage[256];
  for(int i =0; i < allImages.length; i++){
    String filename = files[i+1].toString();
    PImage img = loadImage(filename);
    
    allImages[i] = createImage(scl, scl, RGB);
    allImages[i].copy(img, 0, 0, img.width, img.height, 0, 0, scl, scl);
    allImages[i].loadPixels();
    
    float avg = 0;
    for (int j = 0; j < allImages[i].pixels.length; j++){
      float b = brightness(allImages[i].pixels[j]);
      avg += b;
    }
    avg /= allImages[i].pixels.length;
    brightness[i] = avg;
  }
  //printArray(brightness);
  
  for(var i =0; i < brightImages.length; i++){
    float record = 256;
    for(int j = 0; j < brightness.length; j++){
      float diff = abs(i - brightness[j]);
      if(diff < record){
        record = diff;
        brightImages[i] = allImages[j];
      }
    }
    
  }

  
  w = klimt.width/scl;
  h = klimt.height/scl;
  
  smaller = createImage(w, h, RGB);
  smaller.copy(klimt, 0, 0, klimt.width, klimt.height, 0, 0, w, h);
}

void draw(){
  smaller.loadPixels();
  //image(klimt,0,0);
  //image(smaller, 0, 0);
  for(int x =0; x < w; x++){
    for(int y =0; y < h; y++){
      int index = x + y * w;
      color c = smaller.pixels[index];
      int imageIndex = int(brightness(c));
      //fill(brightness(c));
      //noStroke();
      //rect(x*scl, y*scl, scl, scl);
      image(brightImages[imageIndex], x*scl, y*scl, scl, scl);
    }
  }
  noLoop();
}

// Function to list all the files in a directory
//File[] listFiles(String dir) {
//  File file = new File(dir);
//  if (file.isDirectory()) {
//    File[] files = file.listFiles();
//    return files;
//  } else {
//    // If it's not a directory
//    return null;
//  }
//}
