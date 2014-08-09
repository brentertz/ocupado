int reed = 0;
int led = 7;
int state = 0;
int previousState = 0;
char stateString[20];

void setup() {
  Spark.variable("state", &stateString, STRING);
  pinMode(reed, INPUT);
  pinMode(led, OUTPUT);
}

void loop() {
  previousState = state;
  state = digitalRead(reed);
  strcpy(stateString, state > 0 ? "ocupado" : "desocupado");

  if (state != previousState) {
    Spark.publish("state", stateString);
    digitalWrite(led, state > 0 ? HIGH : LOW);
  }
}
