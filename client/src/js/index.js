
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '260',
        width: '540',
        videoId: 'M7lc1UVf-VE',
        playerVars: { 'autoplay': 1, 'controls': 0 },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    let pgd = player.getDuration();
    let vpb = document.getElementById("video_progress_bar");
    vpb.setAttribute("max",pgd);
}

document.getElementById('btnplay').addEventListener('click',playV);
function playV(element){
    let btn = document.getElementById("btnplay");
    btn.style.display = 'none';
    let btn2 = document.getElementById("btnpause");
    btn2.style.display = '';
    player.playVideo();
}
document.getElementById('btnpause').addEventListener('click',pauseV);
function pauseV(element){
    let btn = document.getElementById("btnplay");
    btn.style.display = '';
    let btn2 = document.getElementById("btnpause");
    btn2.style.display = 'none';
    player.pauseVideo();
}
/*
// Controles multimedia
function playVideo() {
    let btn = document.getElementById("btnplay");
    btn.setAttribute("onclick","pauseVideo()");
    btn.setAttribute("value","pause");
    player.playVideo();
}
function pauseVideo() {
    let btn = document.getElementById("btnplay");
    btn.setAttribute("onclick","playVideo()");
    btn.setAttribute("value","play");
    player.pauseVideo();
}

// Volumen__________________________________________________________________________
const volumen = document.getElementById('volumen')

volumen.addEventListener('input', function() {
  let v = volumen.value;
  player.setVolume(v);
});

// ProgressBar__________________________________________________________________________
const vpb = document.getElementById('video_progress_bar')

vpb.addEventListener('input', function() {
  let rb = vpb.value;
  player.seekTo(rb);

});*/