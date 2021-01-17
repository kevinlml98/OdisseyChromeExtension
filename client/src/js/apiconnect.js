// FETCH --> Retorna una promesa

var req = 'users';
var id = 1;
var url = `http://localhost:4000/${req}`;
var nombre;
var correo;


// GET/users___________________________________
function GET_AllUsers(){
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

// GET/users___________________________________
function GET_AllUsers(){
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


// GET/users/id___________________________________
async function GET_Sound(){

    fetch( url + '/users/1', {
        method: 'GET',
        header :{
            'usuario' : usuario
        }
    }).then( (response) => response.json()).then(data => {
        console.log(data);
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



