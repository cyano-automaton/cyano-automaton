import json
from datetime import datetime
from os import listdir
"""
def avg (list):
	list_sum = 0
	for i in list:
		list_sum = list_sum + i
	avg = list_sum / len(list)
	return avg

def byMinute(e):
  return e['minute']

files = listdir("./data")
files.remove("right_now.json")
print (files)

objects=[]

for i in files:
	with open ("./data/"+i, "r") as f:
		x=json.loads(f.read())
		objects.append(x)

objects.sort(key=byMinute)


for i in objects:
	counter = 0
	objects[counter]["temp"] = [objects[counter]["temp"]]

	objects[0]["temp"].append(objects[1]["temp"])
	print(objects[0]["temp"])

for i in objects:


object[0].temp = [object[0].temp]
object[0].tds = [object[0].temp]
object[0].ph = [object[0].temp]
object[0].ntu = [object[0].temp]

for i in objects:
        object[0].temp = [object[0].temp, object[1].temp]
"""
