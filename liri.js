require("dotenv").config();
const Spotify = require("node-spotify-api");
const keys = require('./keys.js');
const otherKeys = require('./otherkeys')
const req = require('request');
const fs = require('fs');
const moment = require('moment');
const spotify = new Spotify(keys.spotify);

var input = process.argv;
var combined = ''

for (let i = 3; i < input.length; i++) {
    combined += ' ' + input[i];
}

input[3] = combined;

parse(input[2], input[3])

function findConcert(artist) {
    var toLog = artist
    var stringArr = artist.trim().split(" ");
    artist = ''
    

    for (let i = 0; i < stringArr.length; i++) {
        if (i == 0) {
            artist += stringArr[i]
        } else {
            artist += "%20" + stringArr[i]
        }
    }

    console.log(artist)

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + otherKeys.bands + "&date=all"

    req(queryUrl, function (e, req, body) {
        if (e) { console.log(e) } else {
            let data = JSON.parse(body)

            for (let i = 0; i < data.length; i++) {
                var string = `
====================Venue feat. ${toLog}============================
Venue Name: ${data[i].venue.name}
Venue Location: ${data[i].venue.country} ${data[i].venue.city}
Date: ${moment(new Date(data[i].datetime)).format("MM-DD-YYYY")}
                                `
                console.log(string);
                writeLog(string);

            }
        }
    })
}


function findMovie(movieName) {

    if (movieName == '') {
        movieName = 'Mr. Nobody'
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + otherKeys.omdb;

    req(queryUrl, function (e, req, body) {
        if (e) { console.log(e) } else {
            let data = JSON.parse(body)
            
            var toString = `
====================Movie==============================
Title: ${data.Title}
Year: ${data.Year}
IMDB Rating: ${data.imdbRating}
Rotten Tomatoes Rating:
Country: ${data.Country}
Language: ${data.Language}
Plot: ${data.Plot}
Actors: ${data.Actors}
            `
            console.log(toString);
            writeLog(toString);
        }
    })
}



function findSong(song) {

    if (song == '') {
        song = 'The Sign'
    }


    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let j = 0; j < data.tracks.items.length; j++) {


            var stringToLog = `
================Song from spotify=======================================
Artists: `;
            for (let i = 0; i < data.tracks.items[j].album.artists.length; i++) {
                if (i == data.tracks.items[j].album.artists.length - 1) {
                    stringToLog += data.tracks.items[j].album.artists[i].name
                } else {
                    stringToLog += data.tracks.items[j].album.artists[i].name + ','
                }
            }

            stringToLog += `
URL: ${data.tracks.items[j].album.external_urls.spotify}
Album Name: ${data.tracks.items[j].album.name}
Song Name: ${data.tracks.items[j].name}\n`
            console.log(stringToLog);
            writeLog(stringToLog);
        }
    });
}


function parse(keyword, term) {
    switch (keyword) {
        case `concert-this`:
            findConcert(term);
            break;

        case `spotify-this-song`:
            findSong(term)
            break;

        case `movie-this`:
            findMovie(term);
            break;

        case `do-what-it-says`:
            random()
            break;
    }
}

function random() {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('random.txt')
    });

    lineReader.on('line', function (line) {       
        console.log(line);
        var dataArr = line.split(",");
        dataArr[1] = dataArr[1].replace(/"/g,"");
        parse(dataArr[0], dataArr[1]);
    });
}

function writeLog(toWrite) {

    fs.appendFile('log.txt', toWrite, function (e) {
        if (e) {
            console.log(e)
        }
    })

}