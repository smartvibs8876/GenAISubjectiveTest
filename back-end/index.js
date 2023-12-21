const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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
    const { email, password } = req.body;
  
    // Get phone number from database
    const loginCheck = `SELECT * FROM users WHERE email = ? AND password = ?`;

    
    db.query(loginCheck, [email, password], (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error querying database');
      } else if (result.length > 0) {
        const otp = Math.floor(100000 + Math.random() * 900000); 
        const message = `OTP to login to Vibhav Electronics Mart is ${otp}`;
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'vibhavdhaimode@gmail.com', 
            pass: process.argv[2]
          }
        });
        
        // Message details 
        const mailOptions = {
          from: 'vibhavdhaimode@gmail.com',
          to: email,
          subject: 'Vibhav Electronic Mart OTP',
          text: message
        };
        
        // Send email
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.json(otp)
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  
  });
  

  app.post('/register', (req, res) => {
    let user = req.body;
    let sql = `INSERT INTO users (email, password, phone) 
               VALUES (?,?,?)`;
    
    db.query(sql, [user.email, user.password, user.phone], err => {
      if (err) {
        res.status(500).send('Error inserting user data');  
        return;
      };
      res.send('User added successfully!');
    });
  
  });

  app.put('/passwordChange', async (req, res) => {

    const { email, oldPassword, newPassword } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) throw error;
  
      if (results.length == 0) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const user = results[0];
  
      // Verify old password
      const isMatch = oldPassword === user.password;
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }
    
      // Update password in DB
      db.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Password updated successfully' });
      });
  
    });
  
  });

  app.post('/forgot-password', (req, res) => {

    const { email } = req.body;
    console.log(email);
  
    const user = db.query('SELECT * FROM users WHERE email = ?', [email]);
  
    if(!user) {
      return res.status(404).send('Email not found');
    }
  
    // Generate new random password
    const newPassword = generatePassword(); 

    // Update password in DB
    db.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
  
    // Send email with new password
    const message = `Your new password is: ${newPassword}`;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vibhavdhaimode@gmail.com', 
        pass: process.argv[2]
      }
    });
    
    // Message details 
    const mailOptions = {
      from: 'vibhavdhaimode@gmail.com',
      to: email,
      subject: 'Vibhav Electronic Mart Password Reset',
      text: message
    };
    
    // Send email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json(message);
  });
  
  // Helper functions
  
  function generatePassword() {
    // Generate random password  
    const length = 8; // password length
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
  
    return password;
  }
  
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});