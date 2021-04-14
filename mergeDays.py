import json
from os import listdir, remove

def avg (list):
	list_sum = 0
	for i in list:
		list_sum = list_sum + i
	avg = list_sum / len(list)
	return avg

def byHour(e):
    return e[0]['hour']

def byDay(e):
    return e[0]['day']

files = listdir("/home/pi/cyano-automaton.github.io/hours/")

print(files)

objects=[]

for i in files:
	with open ("/home/pi/cyano-automaton.github.io/hours/"+i, "r") as f:
		x=json.loads(f.read())
		objects.append(x)

objects.sort(key=byHour)
objects.sort(key=byDay)

day = []

for i in range(24):
	day.append(objects[i])
location = "/home/pi/cyano-automaton.github.io/days/"
filename =str(objects[i][0]["year"])+"_"+str(objects[i][0]["month"])+"_"+str(objects[i][0]["day"])
extension = ".json"
with open (location+filename+extension, "w") as outfile:
	json.dump(day, outfile, indent=4)

for i in range(24):
	location = "/home/pi/cyano-automaton.github.io/hours/"
	filename =str(objects[i][0]["year"])+"_"+str(objects[i][0]["month"])+"_"+str(objects[i][0]["day"])+"_"+str(objects[i][0]["hour"])
	extension = ".json"
	remove(location+filename+extension)
	print(location+filename+extension)

for i in range(24):
	objects.pop(i)
