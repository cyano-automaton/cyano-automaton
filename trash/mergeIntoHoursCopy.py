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

files = listdir("./minutes/")



for f in list(files):
	if not(f.endswith("5.json") or f.endswith("0.json")):
		files.remove(f)
		remove("./minutes/"+f)


objects=[]

for i in files:
	with open ("./minutes/"+i, "r") as f:
		x=json.loads(f.read())
		objects.append(x)

objects.sort(key=byMinute)
objects.sort(key=byHour)

hour = []
for i in range(12):
	hour.append(objects[i])
location = "./hours/"
filename =str(objects[0]["year"])+"_"+str(objects[0]["month"])+"_"+str(objects[0]["day"])+"_"+str(objects[0]["hour"])
extension = ".json"
with open (location+filename+extension, "w") as outfile:
	json.dump(hour, outfile, indent=4)

with open (location+"lastHour"+extension, "w") as outfile:
	json.dump(hour, outfile, indent=4)

for i in range(12):
	location = "./minutes/"
	filename =str(objects[i]["year"])+"_"+str(objects[i]["month"])+"_"+str(objects[i]["day"])+"_"+str(objects[i]["hour"])+"_"+str(objects[i]["minute"])
	extension = ".json"
	remove(location+filename+extension)
	print(location+filename+extension)

for i in range(12):
	objects.pop(i)
