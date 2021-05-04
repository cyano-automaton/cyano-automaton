const fs = require('fs');
require('dotenv').config();

let year_json = fs.readFileSync('./yearForToday.json');
let year_object = JSON.parse(year_json);
let year = year_object.year;

let captions_json = fs.readFileSync('./nasa/captions.json');
let caption = JSON.parse(captions_json);
let kolejnosc = year-1959;


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

var b64content = fs.readFileSync('./nasa/'+year+".jpg", { encoding: 'base64' })

console.log("Length of caption = " + caption[kolejnosc].length)

if (caption[kolejnosc].length > 296) {
  text = caption[kolejnosc].slice(0,296);
  text = text + "...";
} else {
  var text = caption[kolejnosc];
}

// first we must post the media to Twitter
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and
  // other text-based presentations and interpreters
  var mediaIdStr = data.media_id_string
  var altText = text
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
      var params = { status: text, media_ids: [mediaIdStr] }

      T.post('statuses/update', params, function (err, data, response) {
        console.log(data)
        process.exit()
      })
    }
  })
})
