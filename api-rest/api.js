const express = require('express');
const router = express.Router();

const mysqlConnection = require('./dbconection');



//   GET /checkuser/____________________________________
router.get('/checkuser/:email', (req, res) => {

  const email = req.params['email'];
  const sql = 'call SearchEmail("' + email + '")';

  mysqlConnection.query(sql, (error, result) => {
    if (error) throw error;
    if (result[0].length > 0) {
      res.json({
        exist: true,
        body : result[0]
      });
    }
    else {
      res.json({
        exist : false
      });
    }
  });


});



//   GET /users____________________________________________
router.get('/users', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {

      mysqlConnection.query('call ReturnAllUsers()', (error, result) => {
        if (error) throw error;
        if (result.length > 0) {

          res.json(result[0]);
          
        }
        else {
          res.json({
            res : "not found"
          });
        }
      });


    }
    else {
      res.json({
        status: "Access Blocked"});
    }
  });


});

//   GET /users?id=parametro_______________________________
router.get('/users/:id', (req, res) => {


  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {


      const { id } = req.params;
      mysqlConnection.query(`call ReturnUser(${id})`, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          res.json(result[0]);
        }
        else {
          res.json({
            status: "Not result"});
        }
      });


    }
    else {
      res.json({
        status: "Access Blocked"});
    }
  });

});



//   GET /users/exists?id=parametro________________________
router.get('/users/exists/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(`call ReturnUser(${id})`, (error, result) => {


    if (error) throw error;
    if (result[0].length > 0) {
      res.json({
        status: "User founded"});
    }
    else {
      res.json({
        status: "Not result"});
    }

  });
});






//   POST /users___________________________________________
router.post('/users', (req, res) => {


  const {email} = req.body.email;
  const sql = `call AddUser(${email})`;

  mysqlConnection.query(sql, error => {
    if (error) throw error;
    res.json({
      status: "User added"});
  }
  );
});


//   DELETE /users/id______________________________________
router.delete('/users/:id', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {


      const { id } = req.params;
      mysqlConnection.query(`call DeleteUser(${id})`, error => {
        if (error) throw error;
        res.json({
          status: "User deleted"});
      });

    }
    else {
      res.json({
        status: "Access Blocked"});
    }
  });



});


//   GET /songs____________________________________________
router.get('/songs', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {


      mysqlConnection.query('call ReturnAllSoundtracks()', (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          res.json(result);
        }
        else {
          res.json({
            status: "Not result"});
        }
      });



    }
    else {
      res.json({
        status: "Access Blocked"});
    }
  });



});

//   DELETE /songs/id______________________________________
router.delete('/songs/:id', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {


      const { id } = req.params;
      mysqlConnection.query(`call DeleteSoundtracks(${id})`, error => {
        if (error) throw error;
        res.json({
          status: "Sound deleted"});
      });


    }
    else {
      res.json({
        status: "Access Blocked"});
    }
  });



});


//   GET /songs?search=____________________________________
router.get('/songs/:search', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {



      const search = req.params['search'];

      const sql = 'call SearchSoundtracks("' + search + '")';

      mysqlConnection.query(sql, (error, result) => {
        if (error) throw error;
        if (result[0].length > 0) {
          res.json(result[0]);
        }
        else {
          res.json({
            status: "Not result"});
        }
      });


    }
    else {
      res.json({
        status: "Access Blocked"});
    }
  });



});


module.exports = router;