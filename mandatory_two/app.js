require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.static('public'));

const rateLimiter = require('express-rate-limit');
const loginLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10 // limit each IP to 15 requests per windowMs
});
//ratelimiter anvendes til login-siden
app.use('/login', loginLimiter);

const login = require('./routes/login');
const user = require('./routes/user');


const session = require("express-session");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//secretPage er under session, da kald til /secretPage kræver, at man er logget ind først
const secretPage = require('./routes/secretPage');

app.use('/login', login);
app.use('/user', user);
app.use('/secretPage', secretPage);

app.get('/', (req, res) => {
    //redirecter til login, da der ikke er en velkomstside endnu
   res.redirect('./login');
});

const port  = process.env.PORT || 3000;

app.listen(port, (error) => {
    if (error) {
        console.log("Server couldn't start :( ", error);
    }
    console.log("Server started on port", Number(port));
});