
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
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

});