/*
	Ejecución de los SP
*/

/*
Usuarios__________________________________________________
*/
call AddUser('kevin@mail.com');
call AddUser('kenneth@mail.com');
call AddUser('melvin@mail.com');
call AddUser('jose@mail.com');
call AddUser('sandra@mail.com');
call AddUser('cata@mail.com');
call AddUser('ale@mail.com');
call AddUser('ana@mail.com');
call AddUser('gerardo@mail.com');
call AddUser('pedro@mail.com');

/*
Usuario administrador_______________________________
*/
call AssingAdminUser(1);

/*
Canciones _____________________________________
*/
call AddSoundtacks('JwPlRrF5v_w','kiss','i was made for love','dynasty','https://images-na.ssl-images-amazon.com/images/I/71ta0e6TEGL._AC_SL1416_.jpg');
call AddSoundtacks('QQcQDbpDH_o','skrillex','cinema','cinema','https://m.media-amazon.com/images/I/81ptR9lIlkL._SS500_.jpg');
call AddSoundtacks('iO35Uv8DsJ','audioslave','like a stone','audioslave','https://m.media-amazon.com/images/M/MV5BYjEzNWRhZmItOWE4Zi00MGM2LTk1ZjktZGQyMDc1ZWNjMDI3XkEyXkFqcGdeQXVyNTk1NTMyNzM@._V1_.jpg');
call AddSoundtacks('"WyHAzfqkV5M','audioslave','show me how to live','audioslave','https://m.media-amazon.com/images/M/MV5BYjEzNWRhZmItOWE4Zi00MGM2LTk1ZjktZGQyMDc1ZWNjMDI3XkEyXkFqcGdeQXVyNTk1NTMyNzM@._V1_.jpg');
call AddSoundtacks('P5R3hU3hKkE','Robin S','show me love','debut','https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Robin_S_Show_Me_Love_album_cover.jpg/220px-Robin_S_Show_Me_Love_album_cover.jpg');

/*
imgen
*/

/*
Palabras clave
*/

call AddKeyword('i');
call AddKeyword('was');
call AddKeyword('made');
call AddKeyword('for');
call AddKeyword('love');
call AddKeyword('cinema');
call AddKeyword('like');
call AddKeyword('a');
call AddKeyword('stone');
call AddKeyword('show');
call AddKeyword('me');
call AddKeyword('how');
call AddKeyword('to');
call AddKeyword('live');
call AddKeyword('audioslave');
call AddKeyword('kiss');
call AddKeyword('skrillex');
call AddKeyword('Robin');
call AddKeyword('S');

/*
Asociar palabra clave
*/
call AssingnWord(1,1);
call AssingnWord(2,1);
call AssingnWord(3,1);
call AssingnWord(4,1);
call AssingnWord(5,1);

call AssingnWord(6,2);

call AssingnWord(7,3);
call AssingnWord(8,3);
call AssingnWord(9,3);

call AssingnWord(10,4);
call AssingnWord(11,4);
call AssingnWord(12,4);
call AssingnWord(13,4);
call AssingnWord(14,4);

call AssingnWord(10,5);
call AssingnWord(11,5);
call AssingnWord(5,5);

call AssingnWord(15,3);
call AssingnWord(15,4);
call AssingnWord(16,1);
call AssingnWord(17,2);
call AssingnWord(18,5);
call AssingnWord(19,5);


