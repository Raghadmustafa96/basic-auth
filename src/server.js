'use strict';

const express = require('express');
const cors = require('cors');
const notFoundRequest = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const app = express();
const userRouter = require('./auth/router.js');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello From the Other side');
});

app.get('/error', (req, res) => {
  throw new Error('ERROR FROM server side :) ...');
});

app.use('/', userRouter);

app.use('*', notFoundRequest);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};