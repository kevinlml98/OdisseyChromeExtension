/*
Cliente
Este servidor es el encargado de abrir la webapp
*/

const express=require('express');
const app=express();

app.use(express.static(__dirname + '/src'));

const server=app.listen(3000, () => {
  console.log('Servidor web iniciado en puerto 3000');
});