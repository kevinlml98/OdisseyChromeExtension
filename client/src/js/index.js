
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '200',
        width: '200',
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
document.getElementById('btnplay').addEventListener('click', function () {
    player.playVideo();
});
document.getElementById('btnpause').addEventListener('click', function () {
    player.pauseVideo();
});


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