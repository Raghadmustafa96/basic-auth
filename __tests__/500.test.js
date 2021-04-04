'use strict';
const { app } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose'); 
const request = supergoose(app);

describe('Error Handler', () => {
  it('should the status be 500 if handle server error', async () => {
    const res = await request.get('/error');
    expect(res.body.error).toEqual('ERROR FROM server side :) ...');
    expect(res.status).toEqual(500);
  });
});