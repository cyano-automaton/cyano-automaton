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
