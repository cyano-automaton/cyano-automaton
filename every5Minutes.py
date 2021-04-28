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
files.remove("last24.json")
files.remove("last7.json")

print (files)
objects=[]

for i in files:
	with open ("/home/pi/cyano-automaton.github.io/data/"+i, "r") as f:
		x=json.loads(f.read())
		objects.append(x)

objects.sort(key=byMinute)
print (objects)

keys = ["temp", "tds", "ph", "ntu"]

five_minutes=[]
for i in range(5):
	for j in keys:
		objects[i][j] = [objects[i][j]]
		objects[i][j].append(objects[i+1][j])
		objects[i][j].append(objects[i+2][j])
		objects[i][j].append(objects[i+3][j])
		objects[i][j].append(objects[i+4][j])
		objects[i][j+"_avg"]=avg(objects[i][j])
print(objects)


"""
if files["lastHours.json"] {

}

for i in range(5):
	for j in keys:
		objects[i][j] = [objects[i][j]]
		objects[i][j].append(objects[i+1][j])
		objects[i][j].append(objects[i+2][j])
		objects[i][j].append(objects[i+3][j])
		objects[i][j].append(objects[i+4][j])
		objects[i][j+"_avg"]=avg(objects[i][j])
	location = "/home/pi/cyano-automaton.github.io/tmp/"
	filename =str(objects[i]["year"])+"_"+str(objects[i]["month"])+"_"+str(objects[i]["day"])+"_"+str(objects[i]["hour"]))
	extension = ".json"
	with open (location+filename+extension, "w") as outfile:
		json.dump(objects[i], outfile,  indent=4)

for y in files:
	remove("/home/pi/cyano-automaton.github.io/tmp/"+y)
"""
