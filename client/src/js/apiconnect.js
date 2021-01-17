


// FETCH --> Retorna una promesa

var url = "http://localhost:4000";
var usuario = 1;
var nombre;
var correo;
var datos;


// GET/___________________________________
function GET_HelloWorld() {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'usuario': 1
        },
        mode: 'no-cors'
    })
        .then(response => response.json())
        .then(data => console.log(data)).catch(error => {
            console.log(error);
        });

}




// GET/users___________________________________
function GET_AllUsers(){
    url = url + "/users";

    fetch( url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'usuario' : '1'
          },
        mode : 'no-cors'
    })
    .then(response => response.json())
    .then(data => console.log(data)).catch( error => {
      console.log(error);
    });
    
}

// GET/users/id___________________________________
async function GET_Users(id){

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



