'use strict';

const base64 = require('base-64');

module.exports = async function (req, res, next) {
  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  if (username && password) {
    req.user = { username, password };
    next();
  } else {
    next('invalid user/pass');
  }
};
