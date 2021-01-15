console.log('Popup readay to go!');

//Elementos interactuables
const volumen = document.getElementById('volumen');
const btn = document.getElementById("btnplay");
const videoProgress = document.getElementById("video_progress_bar");
const art = document.getElementById("artista");
const can = document.getElementById("titulo");

let message = {
    intended : 'player',
    txt: 'Hello from the other side'
}

//Envia un mensaje formato JSON por medio de la funcion especifia de API de Chrome
function sendMsg(msg)
{
    chrome.runtime.sendMessage(msg);
}

//--------------------------------------------------//
//               onMessage listener                 //
//--------------------------------------------------//
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg)
{
    console.log(msg);
    if(msg.intended =="popup")
    {
        if(msg.action == "status")
        {
            //Titulo de la cancion
            can.innerHTML = msg.cancion;
            //Nombre del artista
            art.innerHTML = msg.artista;
            
            //Valor del volumen igual al player
            volumen.setAttribute("value",msg.volumen);
            
            //Valor del progreso igual al largo del video, y progreso actual del video igual al player.
            videoProgress.setAttribute('max', msg.videoLenght);
            videoProgress.setAttribute('value', msg.videoProgress);
            
            //Estado del boton de pausa/play segun el estado del player
            if(msg.estado == true)
            {
                btn.setAttribute("value","pause");
                
            }else{
                btn.setAttribute("value","play");
                
            }
        }else if (msg.action == "progressBar")
        {
            //Updades del progreso del video
            videoProgress.setAttribute('value', msg.value); 
        }
    }
}

//PopUp listo, pedir stats del player
sendMsg(message);

btn.addEventListener('click', function(){
    
    if(btn.value === 'play'){
        btn.setAttribute("value","pause");
        message ={
            intended: 'player',
            action: "videoPlay"
        }
        sendMsg(message);
    }
    else{
        btn.setAttribute("value","play");
        message ={
            intended: 'player',
            action: 'videoPause'
        }
        sendMsg(message);
    }
});

volumen.addEventListener('input', function() {
    let v = volumen.value;
    
    message ={
        intended: 'player',
        action: 'volume',
        value: v
    }
    sendMsg(message);
});

videoProgress.addEventListener('input', function() {
    let v = videoProgress.value;
    
    message ={
        intended: 'player',
        action: 'progress',
        value: v
    }
    sendMsg(message);
    
});


/*
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var id = 'Xd-luMQNkVw';
var id2 = 'ulfeM8JGq7s';


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: id2,
        playerVars: {'autoplay': 1, 'controls': 0,  'loop': 1},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Hacer "invisible el video"
document.getElementById('player').style.display='none';

function onPlayerReady(event) {
    let pgd = player.getDuration();
    let vpb = document.getElementById("video_progress_bar");
    vpb.setAttribute("max",pgd);
}

//Intento de que la barra de progreso avance con forme al video onPlayerStateChange(event) y onPlay()
var testThread;
function onPlayerStateChange(event) {
    if(event.data == 1)
    {
        testThread = setInterval(onPlay,500);
    }else{
        clearInterval(testThread);
    }
}

function onPlay(){    
    let vpb = document.getElementById("video_progress_bar");
    let time = player.getCurrentTime();
    vpb.setAttribute('value', time); 
}

// Oculta o hace visible el video en la interfaz
document.getElementById('vis').addEventListener('click',toggle);
function toggle(element){
    let ventana = document.getElementById("player");
    
    if(ventana.style.display != 'none'){
        ventana.style.display = 'none';
    }else{
        ventana.style.display = '';
    }
}

// ----------------------------------------------------------------- //
//                     Controles multimedia                          //
// ----------------------------------------------------------------- //

//---------------------------   Play/Pause   ---------------------------

document.getElementById('btnplay').addEventListener('click',playV);
function playV(element){
    let btn = document.getElementById("btnplay");
    
    if(btn.value === 'play'){
        btn.setAttribute("value","pause");
        player.playVideo();
    }
    else{
        btn.setAttribute("value","play");
        player.pauseVideo();
    }
}

//---------------------------   Volumen   ---------------------------

const volumen = document.getElementById('volumen')

volumen.addEventListener('input', function() {
    let v = volumen.value;
    player.setVolume(v);
});

//---------------------------   ProgressBar   ---------------------------

const vpb = document.getElementById('video_progress_bar')

vpb.addEventListener('input', function() {
    let rb = vpb.value;
    player.seekTo(rb);
    
});
*/