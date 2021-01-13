const express = require('express');
const router = express.Router();

const mysqlConnection  = require('./dbconection');


//   GET /users____________________________________________
router.get('/users', (req, res) => {
  mysqlConnection.query('call ReturnAllUsers()', (error, result) =>{
      if (error) throw error;
      if (result.length > 0){
        res.json(result);
      }
      else{
        res.send('Not result');
      }
  });
});

//   GET /users?id=parametro_______________________________
router.get('/users/:id', (req, res) => {
  const {id} = req.params;
  mysqlConnection.query(`call ReturnUser(${id})`, (error, result) =>{
    if (error) throw error;
    if (result.length > 0){
      res.json(result);
    }
    else{
      res.send('Not result');
    }
 });
});


//   GET /users/exists?id=parametro________________________
router.get('/users/exists/:id', (req, res) => {
  const {id} = req.params;
  mysqlConnection.query(`call ReturnUser(${id})`, (error, result) =>{
    if (error) throw error;
    if (result.length > 0){
      res.send('User found');
    }
    else{
      res.send('Not result');
    }
 });  
});

//   POST /users___________________________________________
router.post('/users', (req, res) => {
  

  const sql = `call AddUser(?,?,?)`;
  const userBody = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  };

  mysqlConnection.query(sql,[userBody.name,userBody.password,userBody.email], error =>{
    if (error) throw error;
    res.send('User Addedd')
   }
  );
});


//   DELETE /users/id______________________________________
router.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  mysqlConnection.query(`call DeleteUser(${id})`, error =>{
   if (error) throw error;
   res.send('User deleted');
    
 });
});


//   GET /songs____________________________________________
router.get('/songs', (req, res) => {
  mysqlConnection.query('call ReturnAllSoundtracks()', (error, result) =>{
    if (error) throw error;
    if (result.length > 0){
      res.json(result);
    }
    else{
      res.send('Not result');
    }
});
});

//   DELETE /songs/id______________________________________
router.delete('/songs/:id', (req, res) => {
  const {id} = req.params;
  mysqlConnection.query(`call DeleteSoundtracks(${id})`, error =>{
   if (error) throw error;
   res.send('Sound deleted');
 });
});


//   GET /songs?search=____________________________________
router.get('/songs/:search', (req, res) => {
  const {search} = req.params;
  mysqlConnection.query(`call SearchSoundtracks(${search})`, (error, result) =>{
    if (error) throw error;
    if (result.length > 0){
      res.json(result);
    }
    else{
      res.send('Not result');
    }
 });  
  
});






module.exports = router;