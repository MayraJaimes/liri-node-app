# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

3. To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs.
   * [Twitter](https://www.npmjs.com/package/twitter)
   * [Spotify](https://www.npmjs.com/package/node-spotify-api)
   * [Request](https://www.npmjs.com/package/request)
     * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).
   * [DotEnv](https://www.npmjs.com/package/dotenv)
     
This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

### What Each Command Should Do

1. `node liri.js my-tweets`
   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`
   * This will show the following information about the song in your terminal/bash window
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify   
     * The album that the song is from
   * If no song is provided then your program will default to "The Sign" by Ace of Base.
     
3. `node liri.js movie-this '<movie name here>'`
   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'  
   * You'll use the request package to retrieve data from the OMDB API. The OMDB API requires an API key.

4. `node liri.js do-what-it-says`
  * Using the `fs` Node package, LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands.  
  * Logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
  * Appended each command I ran to the `log.txt` file. 
  * Did not overwrite my file each time I ran a command.
