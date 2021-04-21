import serial
from datetime import datetime, timedelta
import json

def avg (list):
	list_sum = 0
	for i in list:
		list_sum = list_sum + i
	avg = list_sum / len(list)
	return avg

ser= serial.Serial('/dev/ttyACM0', 9600, timeout=1)
ser.flush()

temp=[]
#tds=[]
#ph=[]
ntu=[]

counter = 0

while True:
	start = datetime.now()
	print(start.second)
	if start.second < 5:
		break
		
while True:
	if ser.in_waiting > 0:
		line = ser.readline().decode('utf-8').rstrip()
		print (line)
		counter = counter + 1
		if counter > 5:
			values = line.split(", ")
			temp.append(float(values[0]))
			#tds.append(float(values[1]))
			#ph.append(float(values[2]))
			ntu.append(float(values[1]))
		now = datetime.now()
		print(now.second)
		if now.second > 55:
			break

temp_avg = avg(temp)
#tds_avg = avg(tds)
#ph_avg = avg(ph)
ntu_avg = avg(ntu)

print("Average values from last minute are:" + str(temp_avg) +", "+ str(ntu_avg))

year = now.year
month = now.month
day = now.day
hour = now.hour
minute = now.minute

right_now = {
    "year" : year,
	"month":  month,
	"day": day,
	"hour": hour,
	"minute": minute,
	"temp": temp_avg,
	#"tds": tds_avg,
	#"ph": ph_avg,
	"ntu": ntu_avg
}

print(right_now)

location = "/home/pi/cyano-automaton.github.io/data/"
filename =str(year)+"_"+str(month)+"_"+str(day)+"_"+str(hour)+"_"+str(minute)
extension = ".json"

with open ('/home/pi/cyano-automaton.github.io/data/right_now.json', "w") as outfile:
	json.dump(right_now, outfile,  indent=4)

with open (location+filename+extension, "w") as outfile:
	json.dump(right_now, outfile,  indent=4)
