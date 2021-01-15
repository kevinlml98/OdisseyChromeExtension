
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var id = 'Xd-luMQNkVw';
var id2 = 'qZGwRz8wnSY';
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: id,
        
        playerVars: {'autoplay': 1, 'controls': 0,  'loop': 1},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

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
