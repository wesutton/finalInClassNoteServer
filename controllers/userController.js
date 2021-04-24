// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/test', (req, res) => {
  res.send('testing the user controller');
});

router.post('/register', (req, res) => {
  User.create({                           // POSTMAN -> |
    email: req.body.email,        // const req = { body: { email: 'VALUE' } }
//    email: req.body.user.email, // const req = { body: { user: { email: 'VALUE' } } }
    bassword: bcrypt.hashSync(req.body.bassword, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  .then(user => {
    let token = jwt.sign({ id: user.id }, 'I_AM_SECRET', { expiresIn: '1d' })
    res.send({ user, token })
  })
  .catch(error => res.status(500).send({
    message: 'user not created',
    error: error.errors[0].message
  }))
})

router.post('/login', (req, res) => {
  User.findOne({ 
    where: { 
      email: req.body.email 
    } 
  })
  .then(user => {
    if(user){
      // compare passwords
      bcrypt.compare(req.body.bassword, user.bassword, function(err, matches){
        matches ? generateToken(user) : res.send('Incorrect Bassword')
      })

      function generateToken(user) {
        // create the token
        let token = jwt.sign({ id: user.id }, 'I_AM_SECRET', { expiresIn: '1d' });
        // send the response
        res.send({user, token})
      }
    } else {
      res.send('No user found in the database');
    }

    // res.send(user)
  })
})

module.exports = router;