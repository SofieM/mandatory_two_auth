const express = require('express');
const router = require('express').Router();
const database = require('../database');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const bcrypt = require("bcrypt");
const saltRounds = 12;

const fs = require('fs');

const user = fs.readFileSync(__dirname + '/../public/user/user.html').toString();

router.get('/', (req, res) => {
    return res.send(user)
});

router.post('/', async (req, res) => {
    const signup_username = req.body.signup_username;
    const signup_email = req.body.signup_email;
    const signup_password = req.body.signup_password;

    const encryptedPassword = await bcrypt.hash(signup_password, saltRounds);

    let user = {
        'username': signup_username,
        'email': signup_email,
        'password': encryptedPassword
    };

    database.query("INSERT INTO users SET ?", user, (error, results, fields) =>{
        if (error) {
            res.send('Error', error);
            res.redirect('/user');
        } else {
                //MANGLER! Skal sende velkomstmail til brugeren (til signup_email) med nodemailer
                res.redirect('../login');
        }
    });
});

//PUT/PATCH metode ('/user/:id', hvis man skal kunne opdatere en bruger

module.exports = router;