import gpiozero
from datetime import datetime
from time import sleep

light = gpiozero.DigitalOutputDevice(20)
bubbles = gpiozero.DigitalOutputDevice(21)

while True:
    now = datetime.now()

    if (now.hour > 5) or (now.hour < 23):
        if (now.minute < 45):
            light.on()
        else:
            light.off()
    else:
        light.off()


    if (now.hour < 6) or (now.hour > 22):
        if (now.minute == 0) and (now.second < 21):
            bubbles.on()
    if (now.minute%5 == 0) and (now.second < 21):
        bubbles.on()
    else:
        bubbles.off()
