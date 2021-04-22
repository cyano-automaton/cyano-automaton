import gpiozero
from datetime import datetime
from time import sleep

light = gpiozero.DigitalOutputDevice(20)
bubbles = gpiozero.DigitalOutputDevice(21)

while True:
    now = datetime.now()

    if (now.minute > 45) or (now.hour < 5) or (now.hour > 23):
        light.off()
        print("Light turned off")
    else:
        light.on()
        print("Light turned on")

    print (now.minute%5)
    print (now.second)
    if (now.hour > 6) or (now.hour < 22):
        if (now.minute == 0) and (now.second < 11):
            bubbles.on()
            print("Bubbles turned on")
    if (now.minute%5 == 0) and (now.second < 11):
        bubbles.on()
        print("Bubbles turned on")

    else:
        bubbles.off()
        print("Bubbles turned off")
