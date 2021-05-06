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

var yesterday_hour = last24.slice(0, 36);
var today_hour = last24.slice(last24.length-37,last24.length-1)

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

let data = JSON.stringify(spirulina_produced);
fs.writeFileSync('./spirulinaProduced.json', data);
