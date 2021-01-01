
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
            //'onReady': onPlayerReady
        }
    });
}



function onPlayerReady(event) {
    event.target.playVideo();
}

// Controles multimedia
function playVideo() {
    player.playVideo();
}
function pauseVideo() {
    player.pauseVideo();
}

//player.getDuration():Number muestra la duración de video

const volumen = document.querySelector('#volumen')
const output = document.querySelector('.volumen-output')

output.textContent = volumen.value

volumen.addEventListener('input', function() {
  output.textContent = volumen.value
});