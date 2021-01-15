const express = require('express');
const router = express.Router();

const mysqlConnection = require('./dbconection');


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
          res.send('Not result');
        }
      });


    }
    else {
      res.send("Access Blocked")
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
          res.send('Not result');
        }
      });


    }
    else {
      res.send("Access Blocked")
    }
  });




});



//   GET /users/exists?id=parametro________________________
router.get('/users/exists/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(`call ReturnUser(${id})`, (error, result) => {
    if (error) throw error;
    if (result[0].length > 0) {
      res.send("User found")
    }
    else {
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

  mysqlConnection.query(sql, [userBody.name, userBody.password, userBody.email], error => {
    if (error) throw error;
    res.send('User Addedd')
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
        res.send('User deleted');
      });

    }
    else {
      res.send("Access Blocked")
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
          res.send('Not result');
        }
      });



    }
    else {
      res.send("Access Blocked")
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
        res.send('Sound deleted');
      });


    }
    else {
      res.send("Access Blocked")
    }
  });



});


//   GET /songs?search=____________________________________
router.get('/songs/:search', (req, res) => {

  const header = req.header('usuario');

  mysqlConnection.query('call ReturnUser(' + header + ')', (error, result) => {
    if (error) throw console.log(error);
    if (result[0].length > 0) {



      const search  = req.params['search'];

      const sql = 'call SearchSoundtracks("' + search + '")';

      mysqlConnection.query(sql, (error, result) => {
        if (error) throw error;
        if (result[0].length > 0) {
          res.json(result[0]);
        }
        else {
          res.send('Not result');
        }
      });


    }
    else {
      res.send("Access Blocked")
    }
  });



});


module.exports = router;