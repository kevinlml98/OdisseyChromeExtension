//Variables para identificacion
var userId = 1;
var userCorreo;
const globalUrl = `http://localhost:4000`;
var canUseApp = false;

chrome.identity.getProfileUserInfo(function(userInfo) {
  console.log(userInfo);
  userCorreo = userInfo.email;
})

// FETCH --> Retorna una promesa

// GET/users___________________________________
function GET_AllUsers(){
    var path = `/users`;
    fetch( globalUrl + path, {
        method: 'GET',
        headers: {
            'usuario' : userId
          }
    })
    .then(response => response.json())
    .then(data => console.log(data)).catch( error => {
      console.log(error);
    });
}

// GET/songs/id___________________________________
function GET_Soundtracks(req){
    var path = `/songs/${req}`;
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
}

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

// GET/checkuser ___________________________________
/*
async function CheckUser(pEmail){
  var url = `http://localhost:4000/checkuser/${pEmail}`;
  let res = await fetch( url, {
      headers:{
        'content-type': 'application/json',
    }
    })
    .then( (response) => response.json())
    .then(data => {
      //console.log(data);
      return data;
    });
    return res;
}
*/
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

// OMNIBOX _________________________________________________________
chrome.omnibox.onInputChanged.addListener(function(text, suggest)
    {
      if (canUseApp)
      {
        suggest([
            { content: "primera opcion", description: "1er opcion " + text },
            { content: "segunda opcion" , description: "2da opcion " + text }
        ]);
      }
      else {
        suggest([
            { content: "Sincronice su cuenta en chrome para usar la aplicacion", description: "Sincronice su cuenta en chrome para usar la aplicacion" + text },
        ]);
      }
    }
);


chrome.omnibox.onInputEntered.addListener(function(input){

  if (!canUseApp)
  {
      console.log("loggeese");
  }
});
