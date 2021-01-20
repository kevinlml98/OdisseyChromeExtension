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

/**
 * Envia un mensaje por medio del api de chrome
 * @param {Object} msg - Mensaje en formato JSON
 */
function sendMsg(msg)
{
    chrome.runtime.sendMessage(msg);
}

/**
 * Funcion que es llamada una vez se carga el iframe API de youtube para crear el visor de video embebido
 */
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

/**
 * Funcion que es llamada desde onYoutubeIframeAPIReady, cuando el reproductor esta listo para usarse
 * @see {@link onYouTubeIframeAPIReady}
 * @param {Object} event 
 */
function onPlayerReady(event) {
    console.log('player listo');
}

//Intento de que la barra de progreso avance con forme al video onPlayerStateChange(event) y onPlay()

/**
 * Funcion que es llamada desde onYoutubeIframeAPIReady, cuando el reproductor cambia de estado
 * por ejemplo pausa, play, cargando, etc.
 * @see {@link onYouTubeIframeAPIReady}
 * @param {Object} event 
 */
function onPlayerStateChange(event)
{
    if(event.data == 1)
    {
      testThread = setInterval(onPlay,500);

    }else{
        clearInterval(testThread);
    }
}

/**
 * Funcion Auxiliar de onPlayerStateChange, para enviar updates del progreso del video al PopUp
 * @see {@link onPlayerStateChange}
 */
function onPlay()
{
    message = {
        intended: "popup",
        action: "progressBar",
        CurrentTime: player.getCurrentTime(),
        Duration: player.getDuration()
    };
    sendMsg(message);
}

// onMessage listener
/**
 * Funcion del API de Chrome para recivir mensajes. 
 * Dependiendo de la accion especificada hace acciones multimedia,
 *  o bien envia informacion al PopUp.
 * @see {@link sendStatus}
 * @param {Object} msg 
 */
chrome.runtime.onMessage.addListener(

function (msg)
{
    console.log(msg);

    if(msg.intended === 'player')
    {        
        if (msg.txt == "Hello from the other side")
        {
            sendStatus();
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

        }else if(msg.action == "AudioMute"){
            player.mute();

        }else if(msg.action == "AudioUnmute"){
            player.unMute()

        }
    }
});

/**
 * Envia al PopUp la informacion que este necesita para desplegarse de forma correcta, 
 * y acorde al estado de la cancion que actualmente se escucha
 */
function sendStatus()
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
        videoProgress: player.getCurrentTime(),
        muteado: player.isMuted()
    };
    
    sendMsg(message);
}