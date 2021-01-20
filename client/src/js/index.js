console.log('Popup readay to go!');

//Elementos interactuables
const volumen = document.getElementById('volumen');
const btn = document.getElementById("btnplay");
const videoProgress = document.getElementById("video_progress_bar");
const art = document.getElementById("artista");
const can = document.getElementById("titulo");
const alb = document.getElementById("album");
const bgi = document.getElementsByClassName("media_image")[0];

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
            //Nombre del album
            alb.innerHTML = msg.album;

            bgi.style.backgroundImage = `url('${msg.cover}')`;
            
            //Valor del volumen igual al player
            volumen.setAttribute("value",msg.volumen);
            
            //Valor del progreso igual al largo del video, y progreso actual del video igual al player.
            videoProgress.setAttribute('max', msg.videoLenght);
            videoProgress.setAttribute('value', msg.videoProgress);
            
            //Estado del boton de pausa/play segun el estado del player
            if(msg.estado == true)
            {
                btn.setAttribute("value","pause");
                btn.setAttribute("class","btnpause");
                
            }else{
                btn.setAttribute("value","play");
                btn.setAttribute("class","btnplay");
                
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
        btn.setAttribute("class","btnpause");
        message ={
            intended: 'player',
            action: "videoPlay"
        }
        sendMsg(message);
    }
    else{
        btn.setAttribute("value","play");
        btn.setAttribute("class","btnplay");
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

