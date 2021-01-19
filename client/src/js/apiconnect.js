//Variables para identificacion
var userId = 1;
var userCorreo;
const globalUrl = `http://localhost:4000`;
var canUseApp = false;

var globalSongs;
var globalSelectedSong;
var sugerencias;
var cancion = 'ADDICT';
var request;
var artista =  'Hazbin Hotel';
chrome.identity.getProfileUserInfo(function(userInfo) {
  console.log(userInfo);
  userCorreo = userInfo.email;
})

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
function GET_AllUsers(){
    var path = `/users`;
    fetch( globalUrl + path, {
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
    var path = `/songs/${req}`;
    var response = await fetch(globarUrl + path, {
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

// GET/songs___________________________________
function GET_AllSoundtracks(){
    var path = `/songs`;
    fetch( globalUrl + path, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
            'usuario' : userId
          }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.length);


    }).catch( error => {
      console.log(error);
    });

// POST/users ___________________________________
function PostData(pEmail){
  var path = `/users`;
    fetch(globalUrl + path, {
      method : 'POST',
      headers : {
        'content-type': 'application/json',
      },
      body : JSON.stringify({email:pEmail})
      })
      .then( (response) => response.json())
      .then(data => {
        console.log(data.status);
      });
}

}


async function CheckUser(pEmail){
  var path = `/checkuser/${pEmail}`;
  const respuesta = await fetch(globalUrl + path);
  const data = await respuesta.json();
  console.log(data);
  return data;
}
// GET/users/id___________________________________
async function GetUserID(pId){
  var path = `/users/${pId}`;
  const respuesta = await fetch(globalUrl + path,
  {
    headers:{
      'content-type': 'application/json',
      usuario : userId
  }
  });
  const data = await respuesta.json();
  console.log(data);
  return data;
}

// DELETE /users/id___________________________________
function DeleteUsers(pId){
  var path = `/users/${pId}`;
    fetch(globalUrl+path, {
      method : 'DELETE',
      headers : {
        'content-type': 'application/json',
        usuario : userId
      }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.status);
      });
}
// DELETE/songs/id___________________________________
function DeleteSong(pSongId){
  var path = `/songs/${pSongId}`;
    fetch(globalUrl+path, {
      method : 'DELETE',
      headers : {
        'content-type': 'application/json',
        usuario : userId
      }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.status);
      });
}

//Autorizacion y registro
async function Auth(pEmail)
{
  if (userCorreo != "")
  {
    var isThere = await CheckUser(userCorreo);
    if (  isThere.exist != true)
    {
      PostData(userCorreo);
      isThere =  await CheckUser(userCorreo);
      userId = isThere.body[0].US_Id;
      console.log(userId);
    }
    else
      {
        userId = isThere.body[0].US_Id;
        console.log(userId);
      }
      canUseApp = true;
  }
  else{
    console.log("Usuario no esta registrado en chrome");
  }
}


