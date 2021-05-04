from datetime import datetime, timedelta
import json

with open ("./yearForToday.json", "r") as file:
	year = json.loads(file.read())

year.year = year.year + 1

with open ("./yearForToday.json", "w") as file:
	json.dump(year, file,  indent=4)
