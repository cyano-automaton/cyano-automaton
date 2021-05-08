const fs = require('fs');
require('dotenv').config();

let right_now_json = fs.readFileSync('./data/right_now.json');
let right_now = JSON.parse(right_now_json);

if (right_now.hour < 15) {
  introduction = "Morning report, " + right_now.hour + ":" + "00" +" "+ right_now.day +"."+ right_now.month +"."+ right_now.year +"\n";
  temperature =  "Temperature: " + right_now.temp + "\n";
  turbidity = "Turbidity: " + right_now.ntu;
  text = introduction + temperature + turbidity;
}

if (right_now.hour > 15) {
  introduction = "Evening report, " + right_now.hour + ":" + "00" +" "+ right_now.day +"."+ right_now.month +"."+ right_now.year +"\n";
  temperature =  "Temperature: " + right_now.temp + "°C" +"\n";
  turbidity = "Turbidity: " + right_now.ntu;
  text = introduction + temperature + turbidity;
}

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
