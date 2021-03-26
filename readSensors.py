import serial
from datetime import datetime, timedelta
import json

ser= serial.Serial('/dev/ttyACM0', 9600, timeout=1)
ser.flush()

start = datetime.now()
print (start)

temp=[]
tds=[]
ph=[]
ntu=[]


while True:
	if ser.in_waiting > 0:
		line = ser.readline().decode('utf-8').rstrip()
		print (line)
		values = line.split(", ")
		
		now = datetime.now()
		duration = now - start
		if (duration.total_seconds() > 10):
			break


