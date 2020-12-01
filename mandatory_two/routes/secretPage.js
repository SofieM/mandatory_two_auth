const express = require('express');
const router = require('express').Router();
const fs = require('fs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const path = 'C:\\Users\\Sofie\\IdeaProjects\\node_valgfag\\mandatory_two_auth\\mandatory_two\\';
const secretPage = fs.readFileSync(path + '/public/secretPage/secretPage.html').toString();

router.get('/', (req, res) => {
   if (req.session.loggedin) {
      res.send(secretPage);
   } else {
      res.send('Please login to view this page!');
   }
});

module.exports = router;