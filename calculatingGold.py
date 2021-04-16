import csv

with open('./gold/price.csv', mode='r') as infile:
    reader = csv.dictReader(infile)
    d = dict(reader)    for row in reader: 
