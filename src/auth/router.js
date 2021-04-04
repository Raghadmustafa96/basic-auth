'use strict';
const express = require('express');
const Users = require('./models/users-model.js');
const bcrypt = require('bcrypt');
const router = express.Router();
const basicAuth = require('./middleware/basic.js');


router.post('/signup', signupFunction);
router.post('/signin', basicAuth, signinFunction);


async function signupFunction(req, res) {
  try {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users(req.body);
    const record = await user.save(req.body);
    res.status(200).json(record);
  } catch (e){ res.status(403).send('Error Creating User');}
}

async function signinFunction(req, res) {
  try {
    console.log(req.user);
    const user = await Users.findOne({ username: req.user.username });
    const valid = await bcrypt.compare(req.user.password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login');}
}

module.exports = router;
