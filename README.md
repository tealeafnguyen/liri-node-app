# liri-node-app

## How to use
This CLI application uses 4 different commands

   * `concert-this (Artist Name)`

   * `spotify-this-song (Song Name optional)`

   * `movie-this (Movie Name optional)`

   * `do-what-it-says`
 
Each command will have information printed in the console as well as a log.txt file.

### concert-this
Returns all venues (future and past) that features the artist from bandsintown. A name must be provided. Information is returned as the following.

     * `Name of the venue`
     
     * `Venue location`
     
     * `Date of the Event (use moment to format this as "MM/DD/YYYY")`

### spotify-this-song
Returns a list of songs that are related to the name entered from Spotify. If no song name is provided, 'The Sign' searched by default. Information is returned as the following.

     * `Artist(s)`
     
     * `The song's name`
     
     * `A preview link of the song from Spotify`
     
     * `The album that the song is from`

### movie-this
Returns a movie from omdb. If no movie name is provided, 'Mr Nobody' is searched by default. Information is returned as the following
           
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       
 ### do-what-it-says
 Reads from random.txt and performs a combination of commands above. The format of the text file should be of the follow example.
 ```
 spotify-this-song,"I Want it That Way"
 movie-this,"Shrek"
 concert-this,"Ice Cube"
 ```
   
   
 
