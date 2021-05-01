#include <OneWire.h>
#include <DallasTemperature.h>

#define abovePin A0
#define underPin A1

#define lightPin 6
#define bubblesPin 7
#define heaterPin 8

#define tempMax 31
#define tempMin 29
#define tempPin A4
OneWire oneWire(tempPin);
DallasTemperature tempSensor(&oneWire);



/*#include "DEV_Config.h"
  #include "TSL2591.h"
  UWORD lux = 0;
*/

  float ntu;
  float volt;

void setup(void)
{
  Serial.begin(9600);

  pinMode (abovePin, INPUT);
  pinMode (underPin, INPUT);

  pinMode(tempPin, INPUT);

  pinMode(heaterPin, OUTPUT);
  digitalWrite(heaterPin, HIGH);
/*
  pinMode(bubblesPin, OUTPUT);
  digitalWrite(bubblesPin, HIGH);

  pinMode(lightPin, OUTPUT);
  digitalWrite(lightPin, HIGH);

  pinMode(2, INPUT);
  pinMode(3, INPUT);

  pinMode (A5, INPUT);
  */
  tempSensor.begin();
}

void loop(void)
{
float temp = readTemp();

int above = analogRead(abovePin);
int under = analogRead(underPin);
int photoresistor = above - under;

Serial.print(temp);
Serial.print(", ");
Serial.print(photoresistor);
Serial.println();

if (temp > tempMax ) {
    digitalWrite(heaterPin, HIGH);
  }
if (temp < tempMin) {
    digitalWrite(heaterPin, LOW);
  };
/*
if (digitalRead(2) == HIGH) {
  digitalWrite(lightPin, LOW);
} else {digitalWrite(lightPin, HIGH);}

if (digitalRead(3) == HIGH) {
  digitalWrite(bubblesPin, LOW);
} else {  digitalWrite(bubblesPin, HIGH);}
*/


/*
float ntu = readTurb();
Serial.print(ntu);
Serial.println();
*/

}





float readTemp() {
  tempSensor.requestTemperatures();
  float temp = tempSensor.getTempCByIndex(0);

  if (temp != DEVICE_DISCONNECTED_C) {
    return temp;
  }
  else {
    Serial.println("Error: Could not read temperature data");
  };
}

/*
float readTurb () {
  for (int i = 0; i < 800; i++) {
    volt += ((float)analogRead(A5) / 1023) * 5;
  }
  volt = volt / 800 - 0.5;
  ntu = -1120.4 * square(volt) + 5742.3 * volt - 4352.9;

  if (volt < 2.5) {
    ntu = 3000;
  } else{
      ntu = -1120.4*square(volt)+5742.3*volt-4353.8;
   }
  return ntu;
}*/
