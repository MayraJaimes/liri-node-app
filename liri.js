require("dotenv").config();

const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commands = process.argv[2];

switch(commands) {
	case "my-tweets":
			var params = {screen_name: 'maytej25', count: 10};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (!error) {
			    for (var i = 0; i < tweets.length; i++) {
				  	console.log(tweets[i].text);
				  }
			  }
			});
		break;
	case "spotify-this-song":
		console.log("spotify this song");
		break;
	case "movie-this":
		console.log("movie this");
		break;
	case "do-what-it-says":
		console.log("do what it says");
		break;
	default: 
		console.log("Sorry I did not get that")
}

