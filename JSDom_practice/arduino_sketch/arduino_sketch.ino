#define PIN_BLUE 2
#define POTENTIONETER_PIN A0

int iteration;
int myColor;
int dataArray[2];

void setup() {
  Serial.begin(9600);
}

void loop() {
  iteration = map(analogRead(POTENTIONETER_PIN), 0, 1024, 0, 100);
  if(digitalRead(PIN_BLUE) == HIGH){
    myColor = 270;
  }else{
    myColor = 0;
  }
//  dataArray[0] = myColor;
//  dataArray[1] = iteration;
  Serial.print(myColor);
  Serial.print(',');
  Serial.println(iteration);
  delay(150);
}
