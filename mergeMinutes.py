import json
from os import listdir, remove

def avg (list):
	list_sum = 0
	for i in list:
		list_sum = list_sum + i
	avg = list_sum / len(list)
	return avg

def byMinute(e):
  return e['minute']

def byHour(e):
  return e['hour']

files = listdir("/home/pi/cyano-automaton.github.io/data/")
files.remove("right_now.json")
print (files)
objects=[]

for i in files:
	with open ("/home/pi/cyano-automaton.github.io/data/"+i, "r") as f:
		x=json.loads(f.read())
		objects.append(x)


objects.sort(key=byMinute)
objects.sort(key=byHour)

keys = ["temp", "tds", "ph", "ntu"]
indexes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

for i in indexes:
	for j in keys:
		objects[i][j] = [objects[i][j]]
		objects[i][j].append(objects[i+1][j])
		objects[i][j].append(objects[i+2][j])
		objects[i][j].append(objects[i+3][j])
		objects[i][j].append(objects[i+4][j])
		objects[i][j+"_avg"]=avg(objects[i][j])
	location = "/home/pi/cyano-automaton.github.io/minutes/"
	filename =str(objects[i]["year"])+"_"+str(objects[i]["month"])+"_"+str(objects[i]["day"])+"_"+str(objects[i]["hour"])+"_"+str(objects[i]["minute"])
	extension = ".json"
	with open (location+filename+extension, "w") as outfile:
		json.dump(objects[i], outfile,  indent=4)

for y in files:
	remove("/home/pi/cyano-automaton.github.io/data/"+y)
