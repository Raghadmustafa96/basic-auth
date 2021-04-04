'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const server = require('./src/server.js');

const port = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.start(port);
  })
  .catch((error) => {
    console.log('__CONNECTION ERROR__', error.message);
  });
