require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const session = require("express-session");
const port=8080;
//const student_id=;
//const student_name=;

app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to DB

// var dbConnection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

var dbConnection = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'test'
 })

dbConnection.connect(function(err){
    if (err) {throw err;}
    console.log("DB Connected")
});

//Session

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}))

//Routes

app.post('/login', (req, res) => {
  const { loginUsername, loginPassword } = req.body;

  dbConnection.query('SELECT * FROM users WHERE user_id = ?', loginUsername, (error, results, fields) => {
    if (error) 
    {
      res.status(500).send({'user_id' : 0});
    } 
    else if (results.length === 0) 
    {
      res.status(401).send({'user_id' : 0});
    } 
    else 
    {
      // Compare the user's password to the hashed password in the database
      const user = results[0];
      const salt = 10;

      bcrypt.hash(loginPassword, salt, function (err, hash) 
      {
        if (err) 
        {
          res.send({'user_id' : 0});
          //console.log('Error hashing password', err)
        } 
        else 
        {
          bcrypt.compare(user.password, hash, (error, result) => 
          {
            if (error) 
            {
              console.log('wrong')
              res.status(500).send({'user_id' : 0});
            } 
            else if (result) 
            {
              //console.log('wrong1')
              // Set a session cookie
              req.session.user = user;
              const student_id = user['id'];
              const student_name=user['name'];
              res.status(200).send({'user_id' : student_id});
              //console.log(user_id);
            } 
            else 
            {
              console.log('wrong3')
              res.status(401).send({'user_id' : 0});
            }
          });
        }
      })
    }
  });
});

app.get("/all_users", (req,res) => {
    dbConnection.query("SELECT * FROM users", (err, results) => {
        if (err) {
            throw err
        }
        res.send(results);
    })
});

app.post("/student_coop_schedule", (req,res) => {
  //console.log(req);
  // let query= 'SELECT * FROM coop_schedule WHERE student_id ='+ req.body.id;
  //console.log(query);
  dbConnection.query('SELECT * FROM coop_schedule WHERE student_id = ?', req.body.id, (err, results) => {
      if (err) {
          throw err
      }
      res.send(results);
  })
});

app.put("/update_schedule", (req,res) => {
  console.log("----------------------------------------");
  console.log(req);
  //let query= 'UPDATE coop_schedule SET weekday=?, subject=? WHERE student_id = ?', [req.schedule_id,req.body.weekday,req.body.subject];
  //console.log(query);
  dbConnection.query('UPDATE coop_schedule SET weekday=?, subject=? WHERE id = ?', [req.body.inputWeekday,req.body.inputSubject,req.body.schedule_id], (err, results) => {
      if (err) {
          throw err
      }
      res.send(results);
  })
});

app.delete("/delete_schedule", (req,res) => {
  console.log("----------------------------------------");
  console.log("DATA ="+ req);
  console.log("----------------------------------------");

  dbConnection.query('DELETE from coop_schedule WHERE id = ?',req.body.schedule_id , (err, results) => {
      if (err) {
          throw err
      }
      res.send(results);
  })
});

app.listen(port, () => { console.log("Server started on port "+port) });