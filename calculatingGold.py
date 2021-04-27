import csv
import json
from random import randrange

with open("./goldStrings.json", mode="r") as f:
    strings = json.loads(f.read())

first_sentence = strings["first_sentence"][randrange(19)]
second_sentence = strings["second_sentence"][randrange(19)]
third_sentence = strings["third_sentence"][randrange(19)]
fourth_sentence = strings["fourth_sentence"][randrange(19)]
fifth_sentence = strings["fifth_sentence"][randrange(19)]

content = first_sentence + second_sentence + third_sentence + fourth_sentence + fifth_sentence


with open('./gold/prices.csv', mode='r') as f:
    price = dict(filter(None, csv.reader(f)))

#ceny podane są w U.S. dollars per fine ounce, która 1 wynosi tyle gramów:
uncja = 31.1034768


#All values are in metric tons (t) gold content
with open('./gold/production.csv', mode='r') as f:
    production = dict(filter(None, csv.reader(f)))

#jedna tona to tyle gramów:
t = 1000000

#1 troy ounce = 0.00003.11034768 × 10-5 tonne
#czyli 1 tona to tyle uncji:
uncji_w_tonie = 31103.4768


#“One kg of Spirulina will create 1.8 kg of oxygen and will sequester 1.8 kg of CO2”
tona_spiruliny_pochlania_tyle_ton_CO2 = 1.8

#all dollar amounts are in millions, inflation adjusted
with open('./nasa/spendings.csv', mode='r') as f:
    spendings = dict(filter(None, csv.reader(f)))

#“Gold mines emitted on average 0.8 tonnes of CO2 equivalent for every ounce of gold that was produced in 2019”
co2_tonnes_per_ounce = 0.8



year = input("Which year interests you?\n")

wydatki_w_dolarach = int(float(spendings[year]) * 1000000)
calkowita_wartosc = float(production[year]) * float(price[year]) * uncji_w_tonie

wydatki_nasa_jako_ulamek_wartosci_zlota = wydatki_w_dolarach / calkowita_wartosc

tony_CO2_wyprodukowane_na_uncje = float(production[year]) * uncji_w_tonie * co2_tonnes_per_ounce

tony_spiruliny_potrzebne = tony_CO2_wyprodukowane_na_uncje / tona_spiruliny_pochlania_tyle_ton_CO2

template = {
    "year" : year,
    "spendings" : str(wydatki_w_dolarach),
    "percentage" : str(int(round(wydatki_nasa_jako_ulamek_wartosci_zlota, 2)*100)),
    "CO2_produced": str(int(tony_CO2_wyprodukowane_na_uncje)),
    "spirulina_required": str(int(tony_spiruliny_potrzebne)),
    "spirulina_produced" : "1"
}

print(co2_tonnes_per_ounce*uncji_w_tonie)

print (content.format(**template))

"""
print("In year " + year + " the price of gold was: " + price[year] +" U.S dollars (inflation adjusted) per fine ounce.")
print("We produced: " + production[year] + " metric tones of gold world wide.")
print("NASA spent " + spendings[year] + " millions of dollars that year (inflation adjusted).")
print("")
print("The total value of gold produced in " + year + " is: " + str(round(calkowita_wartosc, 2)) +" U.S dollars.")
print("Which means that NASA projects consumed " + str(round(wydatki_nasa_jako_ulamek_wartosci_zlota, 2)) + " of gold produced globally that year." )

print(strings)

"""
"""

price_per_gram = float(price[year])*uncja
production_in_grams = int(production[year])*t
co2_tonnes = float(production_in_grams) * co2_tonnes_per_gram
total_value = float(production_in_grams)*price_per_gram
gold_spent = spendings_full / total_value

print("Price of gold in " + year + ": " + price[year] +" U.S dollars (inflation adjusted) per fine ounce.")
print("Which is in grams: " + str(round(price_per_gram, 2)) +" U.S dollars per gram.")
print("In " + year + " we produced: " + production[year] + " metric tones of gold world wide.")
print("Which is in grams: " + str(production_in_grams) + " grams.")
print("Which means that " + str(round(co2_tonnes, 2)) + " tonnes of CO2 where released to atmosphere due to mining." )
print("The total value of gold produced in " + year + " is: " + str(round(total_value, 2)) +" U.S dollars.")
print("NASA spent " + spendings[year] + " millions of dollars that year (inflation adjusted).")
print("Which means that NASA projects consumed " + str(round(gold_spent, 2)) + " of gold produced globally that year." )
"""

quit()
