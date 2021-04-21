#include <OneWire.h>
#include <DallasTemperature.h>

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

  pinMode(tempPin, INPUT);
  pinMode(8, OUTPUT);
  digitalWrite(8, HIGH);

  pinMode(7, OUTPUT);
  digitalWrite(7, LOW);

  pinMode (A5, INPUT);
  tempSensor.begin();
}

void loop(void)
{
float temp = readTemp();
Serial.print(temp);
Serial.print(", ");
if (temp > 30 ) {
    digitalWrite(8, HIGH);
  }
if (temp < 27) {
    digitalWrite(8, LOW);
  };


float ntu = readTurb();
Serial.print(ntu);
Serial.println();
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
}
