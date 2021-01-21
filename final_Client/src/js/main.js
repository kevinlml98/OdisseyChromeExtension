// Define variables
let playbtn, mutebtn, seekslider, volumeslider, 
seeking = false, seekto, curtimetext, durtimetext, repeat, randomSong;

var CurrentTime, Duration, playlist_status, playlist_album, artist, SongName, album, cover, poster, player;

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
playlist_album = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
poster = document.getElementById("image");
bgImage = document.getElementById("bgImage");

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
            
            artist = msg.artista;
            SongName = msg.cancion;
            album = msg.album;
            cover = msg.cover;
            player = msg.player;
            fetchMusicDetails()
            //Valor del volumen igual al player
            volumeslider.setAttribute("value",msg.volumen);
            
            //Valor del progreso igual al largo del video, y progreso actual del video igual al player.
            Duration = msg.videoLenght;
            CurrentTime = msg.videoProgress;
            seektimeupdate()
            
            if(msg.muteado == true){

                mutebtn.setAttribute("value","muted");

            }else{    
                mutebtn.setAttribute("value","unmuted");
            
            }
            
            //Estado del boton de pausa/play segun el estado del player
            if(msg.estado == true)
            {
                playbtn.setAttribute("value","pause");
                $("#playpausebtn img").attr("src","images/pause-red.png");
                
            }else{
                playbtn.setAttribute("value","play");
                $("#playpausebtn img").attr("src","images/play-red.png");
            
            }
        }else if (msg.action == "progressBar")
        {
            //Updades del progreso del video
            CurrentTime = msg.CurrentTime;
            Duration = msg.Duration;
            seektimeupdate();
        }
    }
}

//PopUp listo, pedir stats del player
sendMsg(message);

// Add event handling

playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
//visibilitybtn.addEventListener("click", toggle);
seekslider.addEventListener("mousedown", function(event){seeking = true; seek(event);});
seekslider.addEventListener("mousemove", function(event){seek(event);});
seekslider.addEventListener("mouseup", function(){seeking = false;});
volumeslider.addEventListener("mousemove", setvolume);
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
    //Titulo de la cancion
    playlist_status.innerHTML = artist+ " - " + SongName;
    //Nombre del album
    playlist_album.innerHTML = album;
    // Poster Image
    poster.setAttribute("src", cover); 
    // Background Image
    bgImage.setAttribute("src", cover)

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
    message = {
        intended: "API",
        action: "nextSong"
    }
    sendMsg(message);
    fetchMusicDetails();
}
function prevSong(){
    message = {
        intended: "API",
        action: "prevSong"
    }
    sendMsg(message);
    fetchMusicDetails();
}
function mute(){
    if(mutebtn.value == "muted"){
        mutebtn.setAttribute("value","unmuted");
        message = {
            intended: 'player',
            action: 'AudioUnmute'
        }
        sendMsg(message);
        $("#mutebtn img").attr("src","images/speaker.png");
    }else{
        mutebtn.setAttribute("value","muted");
        message = {
            intended: 'player',
            action: 'AudioMute'
        }
        sendMsg(message);
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
                value: seekto
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
