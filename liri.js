require("dotenv").config();

const fs = require("fs");
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const keys = require('./keys.js');
const request = require("request");
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

var commands = process.argv[2];
var userInput = process.argv[3];
var result= "";

switch(commands) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifySong(userInput);
		break;
	case "movie-this":
		movieThis(userInput);
		break;
	case "do-what-it-says":
		console.log("do what it says");
		break;
	default: 
		console.log("Sorry I did not get that. These are the valid commands: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'.")
}

function myTweets() {
	var params = {screen_name: 'maytej25', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
		    for (var i = 0; i < tweets.length; i++) {
			  	
var tweetInfo = 
`Tweet: ${tweets[i].text}, 
Created on: ${tweets[i].created_at}`;

				fs.appendFile("log.txt", " Tweet Information: " + tweetInfo, function(err) {
				    if (err) {
				      return console.log(err);
				    }
				    console.log(tweetInfo);
				});	
			}
		}
	});
}

function spotifySong(input = "gangnam style") {
	spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data){
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
Actors: ${data.Actors}`;}

		fs.appendFile("log.txt", " Movie Information: " + movieInfo, function(err) {
		    if (err) {
		      return console.log(err);
		    }
		    console.log(movieInfo);
		});	
	});
}

// function doWhatSays() {
//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.    
//It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//Feel free to change the text in that document to test out the feature for other commands.
// }
   
// After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.


  