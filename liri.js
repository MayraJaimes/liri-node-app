require("dotenv").config();

const fs = require("fs");
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const keys = require('./keys.js');
const request = require("request");
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

var command = process.argv[2];
var nodeArgs = process.argv;
var userInput = "";
for (var i = 3; i < nodeArgs.length; i++) {
  userInput = userInput + " " + nodeArgs[i];
}

function runCommands(commands, input) {
  switch (commands) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      spotifySong(input);
      break;
    case "movie-this":
      movieThis(input);
      break;
    case "do-what-it-says":
      doWhatSays();
      break;
    default:
      console.log("Sorry I did not get that. These are the valid commands: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'.");
  }
}

function myTweets() {
  var params = {screen_name: 'maytej25', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var tweetInfo = 
`Tweet: ${tweets[i].text}, 
Created on: ${tweets[i].created_at}`;
        console.log(tweetInfo);
        fs.appendFile("log.txt", " Tweet Information: " + tweetInfo, function(err) {
          if (err) {
            return console.log(err);
          }
        });
      }
    }
  });
}

function spotifySong(input = "gangnam style") {
  spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
    var d = data.tracks.items[0];
    var songInfo =
`Artist(s): ${d.album.artists[0].name},
Preview Link: ${d.album.external_urls.spotify},
Album name: ${d.album.name},
Song name: ${d.name}`;
    fs.appendFile("log.txt", " Song Information: " + songInfo, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(songInfo);
    });
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  });
}

function movieThis(input = "Mr. Nobody") {
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=64d75e71";
  console.log(input);
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      var movieInfo =
`Title: ${data.Title}, 
Year released: ${data.Year}, 
imdb Rating: ${data.imdbRating},
Rotten Tomatoes Rating: ${data.Ratings[1].Value},
Country Produced: ${data.Country},  
Movie Language: ${data.Language},
Plot: ${data.Plot},  
Actors: ${data.Actors}`;
    }
    fs.appendFile("log.txt", " Movie Information: " + movieInfo, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(movieInfo);
    });
  });
}

// var nodeArgs = process.argv;

// // Create an empty string for holding the address
// var address = "";

// // Capture all the words in the address (again ignoring the first two Node arguments)
// for (var i = 2; i < nodeArgs.length; i++) {

//   // Build a string with the address.
//   address = address + " " + nodeArgs[i];

// }




function doWhatSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    runCommands(dataArr[0], dataArr[1]);
  });
}
runCommands(command, userInput);