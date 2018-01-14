// author: Darcy Cox http://darcycox.me

var api_key = 'f37b0b594b11a071a92c8925137f2813';
var user = 'ezzymortimer';
var api_root = 'https://ws.audioscrobbler.com/2.0/';
var lastfm_root = 'https://www.last.fm/music/';
var now_playing = 'now-playing';

var album_class = "album-cover";
var link_class = "album-link";
var hover_class = "album-animation";
var text_container_class = "text-container";
var info_wrapper_class = "album-info-wrapper";
var info_class = "album-info";
var info_text_class = "album-info-text";

$("document").ready(function() {

    // make the initial request
    sendRecentTracksRequest();
    window.setInterval(sendRecentTracksRequest, 10000); // resend the request every 10 sec.

    // request albums
    var albumsRequest = new XMLHttpRequest();
    albumsRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            processAlbumsRequest(JSON.parse(this.response));
        }
    };

    albumsRequest.open("GET", api_root + "?method=user.gettopalbums&period=3month&user=" + user + "&api_key=" + api_key + "&format=json")
    albumsRequest.send();

});


// sends a new request for the recent track
function sendRecentTracksRequest() {
    var trackRequest = new XMLHttpRequest();
    trackRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            processTracksRequest(JSON.parse(this.response));
        }
    };
    trackRequest.open('GET', api_root + '?method=user.getrecenttracks&limit=1&user=' + user + '&api_key=' + api_key + '&format=json');
    trackRequest.send();
}


// processes info about the most recent track and renders it in the page.
function processTracksRequest(response) {

    var trackObject = response.recenttracks.track[0];

    // extract all needed information from the track object
    var trackName = trackObject.name;
    var artistName = trackObject.artist['#text'];
    var albumName = trackObject.album['#text'];
    var imageURL = trackObject.image[2]['#text'] // index 2 because it is a bigger image.

    // construct links to track, artist, album.
    var trackURL = trackObject.url;
    var artistURL = lastfm_root + artistName + '/';
    var albumURL = artistURL + albumName + '/';


    // render this information on the web page
    var title = document.getElementById("title");
    title.target = '_blank';
    title.innerHTML = trackName;
    title.href = trackURL;

    var artist = document.getElementById("artist");
    artist.target = '_blank';
    artist.innerHTML = artistName;
    artist.href = artistURL;

    var album = document.getElementById("album");
    album.target = '_blank';
    album.innerHTML = albumName;
    album.href = albumURL;

    document.getElementById("track-image").src = imageURL;

    //check if the track is now playing, update the icon appropriately
    var icon = document.getElementById("last-listened");
    var nowPlaying = false;
    if (trackObject.hasOwnProperty("@attr")) {
        if (trackObject['@attr'].hasOwnProperty('nowplaying')) {
            // track is currently playing
            nowPlaying = true;
            // set speaker class so that the speaker icon shows to indicate now playing
            icon.className = now_playing;
            icon.innerHTML = "";
        }
    }

    if (!nowPlaying) {
        // calculate how long since the latest track was scrobbled.
        // fyi the date property of the api response is a unix time stamp.
        icon.className = "";
        var currentUTS = Date.now()/1000; // divide by 1000 so it's in seconds
        var scrobbleUTS = trackObject.date.uts;
        var minutesSinceScrobble = Math.floor((currentUTS - scrobbleUTS) / 60);

        if (minutesSinceScrobble >= 60 && minutesSinceScrobble < (60 * 24)) {
            icon.innerHTML = "PLAYED " + Math.floor(minutesSinceScrobble / 60) + " HOUR(S) AGO";
        } else if (minutesSinceScrobble >= (60 * 24) && minutesSinceScrobble < (60*24*30)) {
            icon.innerHTML = "PLAYED " + Math.floor(minutesSinceScrobble / (60 * 24)) + " DAY(S) AGO";
        } else if (minutesSinceScrobble >= (60*24*30) && minutesSinceScrobble < (60*24*365)) {
            icon.innerHTML = "PLAYED " + Math.floor(minutesSinceScrobble / (60*24*30)) + " MONTH(S) AGO";
        } else if (minutesSinceScrobble >= (60*24*365)) {
            icon.innerHTML = "PLAYED " + Math.floor(minutesSinceScrobble / (60*24*365)) + " YEAR(S) AGO";
        } else {
            icon.innerHTML = "PLAYED " + minutesSinceScrobble + " MIN(S) AGO";
        }
    }
}
