int percent = 0;
int prevPercent = 0;

void setup() {
  Serial.begin(9600);

}

void loop() {
  percent = round(analogRead(A0)/ 1024.00 * 100);

  if(percent != prevPercent){
    Serial.println(percent);
    prevPercent = percent;
  }
  delay(100);
}
