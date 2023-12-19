const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
//const nodemailer = require('nodemailer')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ecommerce'
  });

  db.connect(err => {
    if (err) { 
      console.log(err)
      switch(err.code) {
        case 'PROTOCOL_CONNECTION_LOST':
          console.error('Database connection was closed.');
          break;
        case 'ER_CON_COUNT_ERROR':
          console.error('Database has too many connections.');
          break;
        case 'ECONNREFUSED':
          console.error('Database connection was refused.');
          break;
      }
    } else {
      console.log('Connected to MySQL');
    }
  });
 // Login route 
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Get phone number from database
    const getPhoneSql = `SELECT phoneNo FROM users WHERE username = ? AND password = ?`;
    
    db.query(getPhoneSql, [username, password], (err, result) => {
      if (err) {
        res.status(500).send('Error querying database');
      } else if (result.length > 0) {
       

        const otp = Math.floor(100000 + Math.random() * 900000); 
  
        const message = `OTP to login to Vibhav Electronics Mart is ${otp}`;
        res.json(message)
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  
  });
  
  app.post('/users', (req, res) => {
    let user = req.body;
    let sql = `INSERT INTO users (username, password, phoneNo, userType) 
               VALUES (?,?,?,?)`;
    
    db.query(sql, [user.username, user.password, user.phoneNo, user.userType], err => {
      if (err) {
        res.status(500).send('Error inserting user data');  
        return;
      };
      res.send('User added successfully!');
    });
  
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});