
'use strict';
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model('users', usersSchema);// create (sql table) with name 'users'
module.exports = Users;
