// Define variables
let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, 
seeking = false, seekto, curtimetext, durtimetext, playlist_status, dir, playlist, 
ext, agent, playlist_artist, repeat, randomSong, CurrentTime, Duration;



/*
// Initialization of YouTube Api

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var id = '5_385OOZlIg';
var url = 'https://www.youtube.com/watch?v=' + id;

// Initialization of Array of Music, Tittle, Poster Image, Artists

dir = "music/";
playlist = ["Cartoon-On-_-On","Elektronomia","Johnning","Popsicle","Fearless"];
title = ["Cartoon - On & On","Elektronomia","Janji-Heroes Tonight","Popsicle","Lost Sky - Fearless"];
artists = ["(feat. Daniel Levi) [NSC Release]","Elektronomia - Sky High [NCS Release]","(feat. Johnning) [NCS Release]",
"LFZ - [NCS Release]","(feat. Chris Linton)[NCS Release]"];
poster = ["images/ncs1.jpeg","images/ncs2.jpg","images/ncs3.jpg","images/ncs4.jpg","images/ncs5.jpg"];

// Used to run on every browser

ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
    ext = ".ogg";
}
*/

// Set object references

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
visibilitybtn = document.getElementById("visibility");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");


/*
playlist_index = 0;

// Audio Object

audio = new Audio();
audio.src = dir + playlist[0] + ext; // music/musicname.mp3
audio.loop = false;

// First song title and artist

playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];
*/

/*

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: id,
        
        playerVars: {'autoplay': 0, 'controls': 0,  'loop': 1},
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}
/*
function onPlayerReady(event) {
    let pgd = player.getDuration();
    let vpb = document.getElementById("video_progress_bar");
    vpb.setAttribute("max",pgd);
}*/
//Intento de que la barra de progreso avance con forme al video onPlayerStateChange(event) y onPlay()
/*var testThread;
function onPlayerStateChange(event) {
    if(event.data == 1)
    {
      testThread = setInterval(seektimeupdate,500);
    }else{
        clearInterval(testThread);
    }
}*/

// Functions

let message = {
    intended : 'player',
    txt: 'Hello from the other side'
}

//Envia un mensaje formato JSON por medio de la funcion especifia de API de Chrome
function sendMsg(msg)
{
    chrome.runtime.sendMessage(msg);
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg)
{
    console.log(msg);
    if(msg.intended =="popup")
    {
        if(msg.action == "status")
        {
            /*
            //Titulo de la cancion
            can.innerHTML = msg.cancion;
            //Nombre del artista
            art.innerHTML = msg.artista;
            //Nombre del album
            alb.innerHTML = msg.album;
            */
            //bgi.style.backgroundImage = `url('${msg.cover}')`;
            
            //Valor del volumen igual al player
            volumen.setAttribute("value",msg.volumen);
            
            //Valor del progreso igual al largo del video, y progreso actual del video igual al player.
            //videoProgress.setAttribute('max', msg.videoLenght);
            //videoProgress.setAttribute('value', msg.videoProgress);
            Duration = msg.videoLenght;
            CurrentTime = msg.videoProgress;
            seektimeupdate();
            
            //Estado del boton de pausa/play segun el estado del player
            if(msg.estado == true)
            {
                playbtn.setAttribute("value","pause");
                
            }else{
                playbtn.setAttribute("value","play");
                
            }
        }else if (msg.action == "progressBar")
        {
            //Updades del progreso del video
            //videoProgress.setAttribute('value', msg.value); 
        }
    }
}

//PopUp listo, pedir stats del player
sendMsg(message);

// Add event handling

playbtn.addEventListener("click", playPause);
//nextbtn.addEventListener("click", nextSong);
//prevbtn.addEventListener("click", prevSong);
//mutebtn.addEventListener("click", mute);
//visibilitybtn.addEventListener("click", toggle);
//seekslider.addEventListener("mousedown", function(event){seeking = true; seek(event);});
//seekslider.addEventListener("mousemove", function(event){seek(event);});
//seekslider.addEventListener("mouseup", function(){seeking = false;});
volumeslider.addEventListener("mousemove", setvolume);
/*
audio.addEventListener("timeupdate", function(){seektimeupdate();});
audio.addEventListener("ended",function(){switchTrack();});
*/
//repeat.addEventListener("click", loop);
//randomSong.addEventListener("click", random);
// Oculta o hace visible el video de YouTube en la interfaz
function toggle(element){
    let ventana = document.getElementById("player");
    
    if(ventana.style.display != 'none'){
        ventana.style.display = 'none';
    }else{
        ventana.style.display = '';
    }
}

function fetchMusicDetails(){
    // Poster Image, Pause/Play Image
    $("#playpausebtn img").attr("src", "images/pause-red.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("#image").attr("src",poster[playlist_index]);

    // Title and Artist
    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    // Audio
    audio.src = dir + playlist[playlist_index] + ext;
    audio.play();
}
function playPause(element){
    if(playbtn.value == "play"){
        playbtn.setAttribute("value","pause");
        message ={
            intended: 'player',
            action: "videoPlay"
        }
        sendMsg(message);
        $("#playpausebtn img").attr("src","images/pause-red.png");
    }else{
        playbtn.setAttribute("value","play");
        message ={
            intended: 'player',
            action: 'videoPause'
        }
        sendMsg(message);
        $("#playpausebtn img").attr("src","images/play-red.png");
    }
}
function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length - 1){
        playlist_index = 0;
    }
    fetchMusicDetails();
}
function prevSong(){
    playlist_index--;
    if(playlist_index < 0){
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetails();
}
function mute(){
    if(player.isMuted()){
        player.unMute();
        $("#mutebtn img").attr("src","images/speaker.png");
    }else{
        player.mute();
        $("#mutebtn img").attr("src","images/mute.png");
    }
}
function seek(event){
    if(Duration == 0){
        null;
    }else{
        if(seeking){
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = Duration *  (seekslider.value / 100);
            message ={
                intended: 'player',
                action: 'progress',
                value: v
            }
            sendMsg(message);
        }
    }
}
function setvolume(){
    message ={
        intended: 'player',
        action: 'volume',
        value: volumeslider.value
    }
    sendMsg(message);
}
function seektimeupdate(){
    if(Duration){
        let nt = CurrentTime * (100 / Duration);
        seekslider.value = nt;
        var curmins = Math.floor(CurrentTime / 60);
        var cursecs = Math.floor(CurrentTime - curmins * 60);
        var durmins = Math.floor(Duration / 60);
        var dursecs = Math.floor(Duration - durmins * 60);
        if(cursecs < 10){cursecs = "0" + cursecs}
        if(dursecs < 10){dursecs = "0" + dursecs}
        if(curmins < 10){curmins = "0" + curmins}
        if(durmins < 10){durmins = "0" + durmins}
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
    }else{
        curtimetext.innerHTML = "00" + ":" + "00";
        durtimetext.innerHTML = "00" + ":" + "00";
    }
}
function switchTrack(){
    if(playlist_index == (playlist.length -1)){
        playlist_index = 0;
    }else{
        playlist_index++;
    }
    fetchMusicDetails();
}
function loop(){
    if(audio.loop){
        audio.loop = false;
        $("#repeat img").attr("src", "images/rep.png");
    }else{
        audio.loop = true;
        $("#repeat img").attr("src", "images/rep1.png");
    }
}
function getRandomNumber(min, max){
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}
function random(){
    let randomIndex = getRandomNumber(0 , playlist.length - 1);
    playlist_index = randomIndex;
    fetchMusicDetails();
}
