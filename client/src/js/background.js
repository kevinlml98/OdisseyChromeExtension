console.log("bg has been started");
var testThread;
let message;
let isPlaying = false;


// Create player 

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var songId = 'ulfeM8JGq7s';


//Envia un mensaje formato JSON por medio de la funcion especifia de API de Chrome
function sendMsg(msg)
{
    chrome.runtime.sendMessage(msg);
}


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: songId,
        playerVars: {'autoplay': 0, 'controls': 0,  'loop': 1},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log('player listo');
}

//Intento de que la barra de progreso avance con forme al video onPlayerStateChange(event) y onPlay()

function onPlayerStateChange(event)
{
    if(event.data == 1)
    {
      testThread = setInterval(onPlay,500);

    }else{
        clearInterval(testThread);
    }
}

function onPlay()
{
    let time = player.getCurrentTime();
    message = {
        intended: "popup",
        action: "progressBar",
        value: time
    };

    sendMsg(message);
}

// onMessage listener
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg)
{
    console.log(msg);

    if(msg.intended === 'player')
    {        
        if (msg.txt == "Hello from the other side")
        {
            message = {
                intended: "popup",
                action: "status",
                artista: ArtistName,
                cancion: SongName,
                album: AlbumName,
                cover: CoverImage,
                estado: isPlaying,
                volumen: player.getVolume(),
                videoLenght: player.getDuration(),
                videoProgress: player.getCurrentTime()
            };
            
            sendMsg(message);
        }
        else if(msg.action == "videoPlay")
        {
            player.playVideo();
            isPlaying = true;

        }else if(msg.action == "videoPause")
        {
            player.pauseVideo();
            isPlaying = false;

        }else if(msg.action == "volume")
        {
            player.setVolume(msg.value);

        }else if(msg.action == "progress")
        {
            player.seekTo(msg.value);
        }
    }
}