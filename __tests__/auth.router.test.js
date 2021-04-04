'use strict';
const { app } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);
const base64 = require('base-64');


describe('Auth', () => {
  let username, password;

  it('should be able to create a new user on POST /signup', async () => {
    const response = await request.post('/signup').send({
      username: 'raghad',
      password: '1234',
    });
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('raghad');
    expect(response.body.password).not.toEqual('123456');
  });

  it('should be able to /signin to login as a user', async () => {
    const response1 = await request.post('/signup').send({
      username: 'r1',
      password: '1234',
    });
    const user = base64.encode('r1:1234');
    let response = await request.post('/signin')
      .set(`Authorization`, `Basic ${user}`);

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('r1');
  });
});
