const fs = require('fs');

let strings_json = fs.readFileSync('./assets/tweetStrings.json');
let strings = JSON.parse(strings_json);

let data_json = fs.readFileSync('./assets/data.json');
let data = JSON.parse(data_json);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

year = 1959;
kolejnosc= year-1959;

spendings = data[kolejnosc]["spendings"];

wydatki_w_dolarach = spendings * 1000000;
calkowita_wartosc = data[kolejnosc]["production"] * data[kolejnosc]["price"] * uncji_w_tonie;
wydatki_nasa_jako_ulamek_wartosci_zlota = wydatki_w_dolarach / calkowita_wartosc;

percentage = Math.round(wydatki_nasa_jako_ulamek_wartosci_zlota*100);

CO2_produced = Math.round(data[kolejnosc]["production"] * uncji_w_tonie * co2_tonnes_per_ounce);

spirulina_required = Math.round(CO2_produced / tona_spiruliny_pochlania_tyle_ton_CO2);

spirulina_produced = 1;

text="";
for (i in array) {
  if (i%2 == 0) {
    text = text + array[i];
  } else {
    text = text + eval(array[i]);
  }
}

console.log(text);


const Twit = require("twit"),
  config = {
    twitter: {
      consumer_key: "D1BCZ4xdDOtDv8r7gfjs1erRF",
      consumer_secret: "nFmlSQgXnUCiAsJzxenaFD0NmIhoOQVqZN4inbZ3ngePVqDt98",
      access_token: "1376797607851360257-2cabZaYENBvOEWDBGCl2Kd5Z3C9IDD",
      access_token_secret: "K90vBvsqDqsrZbjWZwoJ1kBQG1SkH7TwwRsV6byqeV6Sy"
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
});
