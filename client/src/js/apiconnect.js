
var id = 1;
var correo;
var globalSongs;
var globalSelectedSong;




// OMNIBOX _________________________________________________________

chrome.omnibox.onInputChanged.addListener(

    function(text, suggest)
    {

        GET_Soundtracks(text);

        if(globalSongs != undefined){
            if(globalSongs.length > 0){
                for (var i = 0; i < globalSongs.length; i++) {
                   suggest([
                    { content: globalSongs[i]["ST_URL"], description: globalSongs[i]["ST_Title"]}
                    ]);
                 }
            }else{
                suggest([
                    { content: "primera opcion", description: "Not result for: " + text }
                ]);
            }
        }
        
        
    }

);

chrome.omnibox.onInputEntered.addListener(function(text) { 
    globalSelectedSong = text;
    console.log(globalSelectedSong);
    id2 = globalSelectedSong;

});



// GET/users___________________________________
function GET_AllUsers(){
    var url = `http://localhost:4000/users`;
    fetch( url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'usuario' : id
          }
    })
    .then(response => response.json())
    .then(data => console.log(data)).catch( error => {
      console.log(error);
    });   
}

// GET/songs___________________________________
function GET_Soundtracks(req){

    var url = `http://localhost:4000/songs/${req}`;
    fetch( url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'usuario' : id
          }
    })
    .then(response => response.json())
    .then(data => {
        globalSongs = data;
    }).catch( error => {
      console.log(error);
    }); 

}



// POST ___________________________________
function PostData(correo){
    var url = `http://localhost:4000/users`;
    fetch( url, {
        method: 'POST',
        header :{
            'usuario' : id
        },
        body: JSON.stringify({
            'email' : correo
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    
    }).catch( error => {
      console.log(error);
    });
}



