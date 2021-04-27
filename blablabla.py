import csv
import json

with open('./assets/prices.csv', mode='r') as f:
    price = dict(filter(None, csv.reader(f)))

with open('./assets/production.csv', mode='r') as f:
    production = dict(filter(None, csv.reader(f)))

with open('./assets/spendings.csv', mode='r') as f:
    spendings = dict(filter(None, csv.reader(f)))

lata = range(61)
object = []

print((lata[0]+1959))

for i in lata:
    year = {
    "year": 1959+i,
    "price": float(price[str(1959+i)]),
    "spendings": float(spendings[str(1959+i)]),
    "production": int(production[str(1959+i)])
    }
    object.append(year)

with open ('./assets/data.json', "w") as outfile:
	json.dump(object, outfile,  indent=4)
