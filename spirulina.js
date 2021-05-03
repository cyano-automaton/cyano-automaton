const fs = require('fs');

let last24_json = fs.readFileSync('./data/last24.json');
let last24 = JSON.parse(last24_json);


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

console.log(yesterday);
console.log(today);

function spirulinaProduced(pomiar) {
  //wzór do obliczania przejstysci wyrażonej w zanurzeniu dysku secchiego z pomiaru z fotorezystorów
  secchi = 1150/pomiar^0.7;

  //wzór do obliczania masy spiruliny w gramach w litrze plynu na bazie zanurzenia deysku secchiego
  spirulina = 70/secchi;

  //ilosc litrow wody w zbiorniku = 5 litres
  volume = 5;

  return spirulina*volume
}

console.log("Wczoraj w zbiorniku było: "+spirulinaProduced(yesteday)+" gramów spiruliny.")
console.log("Dziś jest w zbiorniku: "+spirulinaProduced(today)+" gramów spiruliny.")
console.log("Czyli wyprodukowanu: "+spirulinaProduced(yesteday)-spirulinaProduced(today)+" gramów spiruliny w ciągu 24h.")
