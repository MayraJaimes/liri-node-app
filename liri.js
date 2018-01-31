require("dotenv").config();

const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const keys = require('./keys.js');
const request = require("request");
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

var commands = process.argv[2];
var userInput = process.argv[3];

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
		  	console.log("Tweet: " + tweets[i].text);
		    console.log("Created on: " + tweets[i].created_at);
			}
		}
	});
}

function spotifySong(input = "gangnam style") {
	spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data){
		var d = data.tracks.items[0];
		console.log("Artist(s): " + d.album.artists[0].name);
		console.log("Preview Link: " + d.album.external_urls.spotify);
		console.log("Album name: " + d.album.name);
		console.log("Song name: " + d.name);
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
		console.log("Title:" data.Title);
		console.log("Year released:" + data.Year);
		console.log("imdb Rating:" + data.imdbRating);
		console.log("Plot:" + data.Plot);
		console.log("Album name:" + data.Language);
		console.log("Album name:" + data.Country);
		console.log("Actors:" + data.Actors);
		console.log("Rotten Tomatoes Rating:" + data.Ratings[1].Value});
		}
	});
}

// function doWhatSays() {

// }