'use strict';
const { app } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose'); 
const request = supergoose(app);

describe('Server Side', () => {
  it('should the status be 404 if handle invalid routes /bad', async () => {
    const res = await request.get('/bad');
    expect(res.body.message).toEqual('Request Not Found');
    expect(res.status).toEqual(404);
  });

  it('should the status be 500 if handle server error', async () => {
    const res = await request.get('/');
    expect(res.text).toEqual('Hello From the Other side');
    expect(res.status).toEqual(200);
  });
});
