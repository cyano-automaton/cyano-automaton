const fs = require('fs');

let last24_json = fs.readFileSync('./data/last24.json');
let last24 = JSON.parse(last24_json);

function averageNTU (array) {
  suma = 0;
  for (i in array) {
    suma = suma + array[i]["ntu"];
  }
  return suma/array.length;
}

var yesterday_hour = last24.slice(0, 24);
var today_hour = last24.slice(last24.length-25,last24.length-1)

var yesterday = averageNTU(yesterday_hour);
var today = averageNTU(today_hour);

/*
var yesterday = last24[0].ntu;
var today = last24[last24.length-1].ntu


for (i in last24) {
  if (last24[last24.length - 1].day > last24[i].day) {
      if (last24[i].ntu > yesterday) {
        yesterday = last24[i].ntu;
      }
    } else {
      if (last24[i].ntu > today) {
        today = last24[i].ntu
      }
    }
}
*/
console.log(yesterday);
console.log(today);
console.log("różnica = "+ (today-yesterday));

function spirulinaProduced(pomiar) {
  //wzór do obliczania przejstysci wyrażonej w zanurzeniu dysku secchiego z pomiaru z fotorezystorów
 secchi = 1150/(pomiar^0.7);
  console.log(secchi);
  //wzór do obliczania masy spiruliny w gramach w litrze plynu na bazie zanurzenia deysku secchiego
   spirulina = 70/secchi;
  console.log(spirulina);
  //ilosc litrow wody w zbiorniku = 5 litres
  volume = 5;

  return spirulina*volume
}

spirulina_wczoraj = spirulinaProduced(yesterday);
spirulina_dzis = spirulinaProduced(today);
spirulina_produced = spirulina_dzis - spirulina_wczoraj;

console.log("Wczoraj w zbiorniku było: "+ spirulina_wczoraj+" gramów spiruliny.")
console.log("Dziś jest w zbiorniku: "+spirulina_dzis+" gramów spiruliny.")
console.log("Czyli wyprodukowanu: "+spirulina_produced+" gramów spiruliny w ciągu 24h.")
