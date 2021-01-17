// OMNIBOX _________________________________________________________



chrome.omnibox.onInputChanged.addListener(


    function(text, suggest)
    {
        suggest([
            { content: "primera opcion", description: "1er opcion " + text },
            { content: "segunda opcion" , description: "2da opcion " + text }
        ]);
    }




);


chrome.omnibox.onInputEntered.addListener(



);


// FETCH --> Retorna una promesa

//var req = 'users';
var id = 1;
//var url = `http://localhost:4000/${req}`;
var nombre;
var correo;


// GET/users___________________________________
function GET_AllUsers(){
    var url = `http://localhost:4000/users`;
    fetch( url, {
        method: 'GET',
        headers: {
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
            'usuario' : id
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






// POST ___________________________________
async function PostData(){
    fetch( url, {
        method: 'POST',
        header :{
            'usuario' : usuario
        },
        body: JSON.stringify({
            name : nombre,
            email : correo
        })
    }).then( (response) => response.json()).then(data => {
        
    });
}



