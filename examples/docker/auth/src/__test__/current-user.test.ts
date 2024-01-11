import request from 'supertest';
import { app } from '../app';

// 1) responds with the correct user if cookie exists and is valid
it('responds with the correct user if cookie exists and is valid', async () => {
  const username = 'testUser';
  const password = 'testPW';

  // -- signup a user
  const signupResponse = await request(app)
    .post('/api/auth/signup')
    .send({
      username,
      password,
    })
    .expect(201);

  // -- get the cookie from that response
  const cookie = signupResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/auth/current-user')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.username).toEqual(username);
});

// 2) responds with null if no valid cookie
// -- send request to /current-user
// -- expect null as resposne (response.body.currentUser)
it('responds with currentUser of null when no cookie included in request', async () => {
  const response = await request(app)
    .get('/api/auth/current-user')
    .send({
      what: 'colors CAN you see',
    })
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
