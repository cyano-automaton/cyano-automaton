import gpiozero
from datetime import datetime

now = datetime.now()
light = gpiozero.DigitalOutputDevice(20)
bubbles = gpiozero.DigitalOutputDevice(21)

while True:
    if (now.minute > 44) and (now.hour < 6) and (now.hour > 22):
        light.off()
    else:
        light.on()

    if (now.minute%5 == 0):
        bubbles.on()
        sleep(10)
        bubbles.off()
    else:
        bubbles.off()
