import json
from os import listdir, remove

def avg (list):
	list_sum = 0
	for i in list:
		list_sum = list_sum + i
	avg = list_sum / len(list)
	return avg

def byHour(e):
  return e[0][0]['hour']

def byDay(e):
  return e[0][0]['day']

files = listdir("./hours/")

objects=[]

for i in files:
	with open ("./hours/"+i, "r") as f:
		x=json.loads(f.read())
		objects.append(x)

#objects.sort(key=byHour)
#objects.sort(key=byDay)


print (objects[0][0]["hour"])
