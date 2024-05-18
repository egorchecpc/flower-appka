const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;
const saltRounds = 10;
const jwtSecret = 'yJf3lM6qX9eB2cV1rT8sN0uP7wG4aI5z';

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'flowers_bd'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Регистрация пользователя
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ', err);
      res.status(500).send('Error hashing password');
      return;
    }

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    connection.query(query, [email, hash], (err, results) => {
      if (err) {
        console.error('Error inserting user: ', err);
        res.status(500).send('Error inserting user');
        return;
      }
      res.status(201).send('User registered successfully');
    });
  });
});

// Логин пользователя
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user: ', err);
      res.status(500).send('Error fetching user');
      return;
    }

    if (results.length === 0) {
      console.error('User not found with email: ', email);
      res.status(401).send('Invalid email or password');
      return;
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords: ', err);
        res.status(500).send('Error comparing passwords');
        return;
      }

      if (!isMatch) {
        console.error('Password does not match for user: ', email);
        res.status(401).send('Invalid email or password');
        return;
      }

      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Пример защищенного маршрута
app.get('/flowers', (req, res) => {
  const query = 'SELECT * FROM flowers';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching flowers: ', err);
      res.status(500).send('Error fetching flowers');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
