//Variables para identificacion
var userId = 1;
var userCorreo;
const globalUrl = `http://localhost:4000`;
var canUseApp = false;

var globalSongs;
var globalSelectedSong;
var sugerencias;
var SongName = 'Adicct';
var request;
var ArtistName = 'Hazbin Hotel';
var AlbumName = ''
var CoverImage = 'https://static.wikia.nocookie.net/hazbinhotel/images/3/37/Addict_-_Imagen_promocional.png/revision/latest?cb=20200717232327&path-prefix=es';


/**
 * Obtiene el correo del usuario que esta logueado en el navegador
 */
chrome.identity.getProfileUserInfo(function (userInfo) {
    console.log(userInfo);
    userCorreo = userInfo.email;
    Auth(userCorreo);
})



// OMNIBOX _________________________________________________________

/**
 * Se activa cuando el usuario escribe en el omnibox
 * @returns sugerencia en el omnibox con los resultados traidos de la base de datos 
 */
chrome.omnibox.onInputChanged.addListener(
    function (text, suggest) {
        (async () => {
            globalSongs = await GET_Soundtracks(text);
            console.log(globalSongs);
            if (globalSongs.status != "Not result") {
                for (element of globalSongs.body) {
                    suggest([
                        { content: element.ST_URL, description: element.ST_Title + " - " + element.ST_Artist, deletable: true }
                    ]);
                }
            }
            else {
                suggest([
                    { content: " ", description: "Not result for: " + text }
                ]);
            }
        })();
    }
);

/**
 * Se activa cuando un usuario confirma lo que se ha escrito en el omnibox.
 * 
 */
chrome.omnibox.onInputEntered.addListener(function (text) {
    if (text != " ") {
        console.log(typeof (text));
        console.log(text);
        for (elem of globalSongs.body) {
            if (elem.ST_URL == text) {
                SongName = elem.ST_Title;
                ArtistName = elem.ST_Artist;
                AlbumName = elem.ST_Album;
                CoverImage = elem.ST_Image;
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
/**
 * Obtiene la lista de usuarios de la base de datos por medio del API
 * @async
 * @returns {Promise} Object
 */
async function GET_AllUsers() {
    var path = `/users`;
    fetch(globalUrl + path, {
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
/**
 * Obtiene una lista de canciones que concuerden con la palabra clave.
 * @async
 * @returns {Promise} Object
 */
async function GET_Soundtracks(req) {
    var path = `/songs/${req}`;
    var response = await fetch(globalUrl + path, {
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
/**
 * Obtiene una lista de todas las canciones en la base de datos.
 * @async
 * @returns {Promise} Object
 */
async function GET_AllSoundtracks() {
    var path = `/songs`;
    fetch(globalUrl + path, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'usuario': userId
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.length);
        }).catch(error => {
            console.log(error);
        });
}

// POST/users ___________________________________
/**
 * Funcion POST para agregar un nuevo usuario en la base de datos
 * @param {string} pEmail - The email related to the user.
 */
function PostData(pEmail) {
    var path = `/users`;
    fetch(globalUrl + path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ email: pEmail })
    })
        .then((response) => response.json())
        .then(data => {
            console.log(data.status);
        });
}

/**
 * Funcion que verifica la existencia de un usuaro en la base de datos por medio del email
 * @async
 * @param {string} pEmail - The email related to the user.
 * @returns {Promise} Object con un mensaje de si existe o no, en caso se que si trae el ID de usurio 
 */
async function CheckUser(pEmail) {
    var path = `/checkuser/${pEmail}`;
    const respuesta = await fetch(globalUrl + path);
    const data = await respuesta.json();
    console.log(data);
    return data;
}

// GET/users/id___________________________________
/**
 * Funcion que obtiene los datos de un usuaro en la base de datos por medio del ID
 * @async
 * @param {string} pId - The ID related to the user.
 * @returns {Promise} Object con los datos de usurio 
 */
async function GetUserID(pId) {
    var path = `/users/${pId}`;
    const respuesta = await fetch(globalUrl + path,
        {
            headers: {
                'content-type': 'application/json',
                usuario: userId
            }
        });
    const data = await respuesta.json();
    console.log(data);
    return data;
}

// DELETE /users/id___________________________________
/**
 * Funcion DELETE para eliminar a un usuario de la base de datos
 * @param {string} pId - ID del usuario que se quiere eliminar
 */
function DeleteUsers(pId) {
    var path = `/users/${pId}`;
    fetch(globalUrl + path, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            usuario: userId
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.status);
        });
}

// DELETE/songs/id___________________________________
/**
 * Funcion DELETE para eliminar una cancion de la base de datos
 * @param {string} pId - ID de la cancion que se quiere eliminar
 */
function DeleteSong(pSongId) {
    var path = `/songs/${pSongId}`;
    fetch(globalUrl + path, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            usuario: userId
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.status);
        });
}

//Autorizacion y registro
/**
 * Verifica si un usuario esta registrado en la base de datos, si no es asi lo registra inmediatamante
 * @param {string} pEmail - Email del usuario.
 */
async function Auth(pEmail) {
    if (userCorreo != "") {
        var isThere = await CheckUser(pEmail);
        if (isThere.exist != true) {
            PostData(userCorreo);
            isThere = await CheckUser(userCorreo);
            userId = isThere.body[0].US_Id;
            console.log(userId);
        }
        else {
            userId = isThere.body[0].US_Id;
            console.log(userId);
        }
        canUseApp = true;
    }
    else {
        console.log("Usuario no esta registrado en chrome");
    }
}