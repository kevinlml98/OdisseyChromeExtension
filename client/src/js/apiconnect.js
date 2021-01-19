console.log("API connect start succesful");

var userId = 1;
var globalSongs;
var globalSelectedSong;
var sugerencias;
var request;
var cancion = 'ADDICT';
var artista =  'Hazbin Hotel';

//Envia un mensaje formato JSON por medio de la funcion especifia de API de Chrome
function sendMsg(msg)
{
    chrome.runtime.sendMessage(msg);
}

// OMNIBOX _________________________________________________________

chrome.omnibox.onInputChanged.addListener(
    function (text, suggest) {
        (async () => {
            globalSongs = await GET_Soundtracks(text);
            console.log(globalSongs);
            if (globalSongs.status != "Not result") {
                for (element of globalSongs.body) {
                    suggest([
                        { content: element.ST_URL, description: element.ST_Title, deletable: true  }
                    ]);
                }
            }
            else {
                suggest([
                    { content: " ", description: "Not result for: " + text}
                ]);
            }
        })();
    }
);

chrome.omnibox.onInputEntered.addListener(function (text) {
    if(text !=" ")
    {
        console.log(typeof(text));
        console.log(text);
        for(elem of globalSongs.body)
        {
            if(elem.ST_URL == text)
            {
                cancion = elem.ST_Title;
                artista = elem.ST_Artist;
                break;
            }
        }
        //text2 = 'Xd-luMQNkVw';
        player.loadVideoById(text);
        player.playVideo();
        isPlaying = true;
    }
});



// GET/users___________________________________
function GET_AllUsers() {
    var url = `http://localhost:4000/users`;
    fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'usuario': userId
        }
    })
    .then(response => response.json())
    .then(data => console.log(data)).catch(error => {
        console.log(error);
    });
}

// GET/songs___________________________________
async function GET_Soundtracks(req) {
    var url = `http://localhost:4000/songs/${req}`;
    var response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'usuario': userId
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    });
    return response;
}



// POST ___________________________________
function PostData(correo) {
    var url = `http://localhost:4000/users`;
    fetch(url, {
        method: 'POST',
        header: {
            'usuario': userId
        },
        body: JSON.stringify({
            'email': correo
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

        }).catch(error => {
            console.log(error);
        });
}



