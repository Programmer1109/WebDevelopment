const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3306;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwerty@1998',
    database: 'registration_form'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to handle form submission
app.post('/register', (req, res) => {
    const { firstName, lastName, email, password, accountType, age, referrer, bio, termsAccepted } = req.body;

    const sql = `INSERT INTO users (first_name, last_name, email, password, account_type, age, referrer, bio, terms_accepted)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [firstName, lastName, email, password, accountType, age, referrer, bio, termsAccepted], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error saving registration');
        } else {
            res.status(200).send('Registration successful');
        }
    });
});
