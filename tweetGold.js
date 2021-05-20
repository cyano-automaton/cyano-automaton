const fs = require('fs');
require('dotenv').config();

let strings_json = fs.readFileSync('./assets/tweetStrings.json');
let strings = JSON.parse(strings_json);

let data_json = fs.readFileSync('./assets/data.json');
let data = JSON.parse(data_json);

let year_json = fs.readFileSync('./yearForToday.json');
let year = JSON.parse(year_json);

let last24_json = fs.readFileSync('./data/last24.json');
let last24 = JSON.parse(last24_json);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function averageNTU (array) {
  suma = 0;
  for (i in array) {
    suma = suma + array[i]["ntu"];
  }
  return suma/array.length;
}

var yesterday_hour = last24.slice(0, 12);
var today_hour = last24.slice(last24.length-13,last24.length-1)

var yesterday = averageNTU(yesterday_hour);
var today = averageNTU(today_hour);

function spirulinaProduced(pomiar) {
  //wzór do obliczania przejstysci wyrażonej w zanurzeniu dysku secchiego z pomiaru z fotorezystorów
 secchi = 1150/(pomiar^0.7);
  //wzór do obliczania masy spiruliny w gramach w litrze plynu na bazie zanurzenia deysku secchiego
   spirulina = 70/secchi;
  //ilosc litrow wody w zbiorniku = 5 litres
  volume = 5;
  return spirulina*volume
};

function roundToThree(num) {
    return +(Math.round(num + "e+3")  + "e-3");
};



spirulina_wczoraj = spirulinaProduced(yesterday);
spirulina_dzis = spirulinaProduced(today);
spirulina_produced = spirulina_dzis - spirulina_wczoraj;
spirulina_produced = roundToThree(spirulina_produced);

let produce = JSON.stringify([spirulina_produced]);
fs.writeFileSync('./spirulinaProduced.json', produce);

const uncji_w_tonie = 31103.4768;
const co2_tonnes_per_ounce = 0.8
const tona_spiruliny_pochlania_tyle_ton_CO2 = 1.8

first_sentence = strings["first_sentence"][getRandomInt(0, 18)];
second_sentence = strings["second_sentence"][getRandomInt(0, 18)];
third_sentence = strings["third_sentence"][getRandomInt(0, 18)];
fourth_sentence = strings["fourth_sentence"][getRandomInt(0, 18)];
fifth_sentence = strings["fifth_sentence"][getRandomInt(0, 18)];

content = first_sentence + second_sentence + third_sentence + fourth_sentence + fifth_sentence;
array = content.split("&");

year = year.year;
kolejnosc= year-1959;

spendings = data[kolejnosc]["spendings"];

wydatki_w_dolarach = spendings * 1000000;
calkowita_wartosc = data[kolejnosc]["production"] * data[kolejnosc]["price"] * uncji_w_tonie;
wydatki_nasa_jako_ulamek_wartosci_zlota = wydatki_w_dolarach / calkowita_wartosc;

percentage = Math.round(wydatki_nasa_jako_ulamek_wartosci_zlota*100);

CO2_produced = Math.round(data[kolejnosc]["production"] * uncji_w_tonie * co2_tonnes_per_ounce);

spirulina_required = Math.round(CO2_produced / tona_spiruliny_pochlania_tyle_ton_CO2);

text="";
for (i in array) {
  if (i%2 == 0) {
    text = text + array[i];
  } else {
    text = text + eval(array[i]);
  }
};

console.log(text);

const Twit = require("twit"),
  config = {
    twitter: {
      consumer_key: process.env["TWITTER_CONSUMER_KEY"],
      consumer_secret: process.env["TWITTER_CONSUMER_SECRET"],
      access_token: process.env["TWITTER_ACCESS_TOKEN"],
      access_token_secret: process.env["TWITTER_ACCESS_TOKEN_SECRET"]
    }
  },
  T = new Twit(config.twitter);

const express = require("express");
var app = express();

let listener = app.listen(process.env.PORT, function() {
  console.log("Your bot is running on port " + listener.address().port);
});

T.post('statuses/update', {
  status: text
}, function(err, data, response) {
  console.log(data)
  process.exit()
});
