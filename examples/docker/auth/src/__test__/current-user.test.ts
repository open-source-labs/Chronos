// // // // import request from 'supertest';
// // // // import { app } from '../app';

// // // // // 1) responds with the correct user if cookie exists and is valid
// // // // it('responds with the correct user if cookie exists and is valid', async () => {
// // // //   const username = 'testUser';
// // // //   const password = 'testPW';

// // // //   // -- signup a user
// // // //   const signupResponse = await request(app)
// // // //     .post('/api/auth/signup')
// // // //     .send({
// // // //       username,
// // // //       password,
// // // //     })
// // // //     .expect(201);

// // // //   // -- get the cookie from that response
// // // //   const cookie = signupResponse.get('Set-Cookie');

// // // //   const response = await request(app)
// // // //     .get('/api/auth/current-user')
// // // //     .set('Cookie', cookie)
// // // //     .send({})
// // // //     .expect(200);

// // // //   expect(response.body.currentUser.username).toEqual(username);
// // // // });

// // // // // 2) responds with null if no valid cookie
// // // // // -- send request to /current-user
// // // // // -- expect null as resposne (response.body.currentUser)
// // // // it('responds with currentUser of null when no cookie included in request', async () => {
// // // //   const response = await request(app)
// // // //     .get('/api/auth/current-user')
// // // //     .send({
// // // //       what: 'colors CAN you see',
// // // //     })
// // // //     .expect(200);

// // // //   expect(response.body.currentUser).toEqual(null);
// // // // });
// // // import request from 'supertest';
// // // import { app } from '../app';

// // // // 1) responds with the correct user if cookie exists and is valid
// // // it('responds with the correct user if cookie exists and is valid', async () => {
// // //   const username = 'testUser';
// // //   const password = 'testPW';

// // //   // -- signup a user
// // //   const signupResponse = await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       username,
// // //       password,
// // //     })
// // //     .expect(201);

// // //   // -- get the cookie from that response
// // //   const cookie = signupResponse.get('Set-Cookie');

// // //   const response = await request(app)
// // //     .get('/api/auth/current-user')
// // //     .set('Cookie', cookie)
// // //     .send({})
// // //     .expect(200);

// // //   expect(response.body.currentUser.username).toEqual(username);
// // // });

// // // // 2) responds with null if no valid cookie
// // // // -- send request to /current-user
// // // // -- expect null as resposne (response.body.currentUser)
// // // it('responds with currentUser of null when no cookie included in request', async () => {
// // //   const response = await request(app)
// // //     .get('/api/auth/current-user')
// // //     .send({
// // //       what: 'colors CAN you see',
// // //     })
// // //     .expect(200);

// // //   expect(response.body.currentUser).toEqual(null);
// // // });

// // import request from 'supertest';
// // import { app } from '../app';

// // // 1) Responds with the correct user if a cookie exists and is valid
// // it('responds with the correct user if cookie exists and is valid', async () => {
// //   const username = 'testUser';
// //   const password = 'testPW';

// //   // -- Sign up a user
// //   const signupResponse = await request(app)
// //     .post('/api/auth/signup')
// //     .send({ username, password })
// //     .expect(201);

// //   // -- Ensure cookie is not undefined
// //   const cookie = signupResponse.get('Set-Cookie');
// //   if (!cookie || cookie.length === 0) {
// //     throw new Error("Cookie is missing from signup response");
// //   }

// //   // -- Request with valid cookie
// //   const response = await request(app)
// //     .get('/api/auth/current-user')
// //     .set('Cookie', cookie) // ✅ Ensure cookie is defined
// //     .expect(200);

// //   expect(response.body.currentUser.username).toEqual(username);
// // });

// // // 2) Responds with `null` when no cookie is included in the request
// // it('responds with currentUser of null when no cookie included in request', async () => {
// //   const response = await request(app)
// //     .get('/api/auth/current-user')
// //     .expect(200);

// //   expect(response.body.currentUser).toBeNull();
// // });
// import request from 'supertest';
// import { app } from '../app';

// // 1) Responds with the correct user if a cookie exists and is valid
// it('responds with the correct user if cookie exists and is valid', async () => {
//   const username = 'testUser';
//   const password = 'testPW';

//   // -- Sign up a user
//   const signupResponse = await request(app)
//     .post('/api/auth/signup')
//     .send({ username, password })
//     .expect(201);

//   // -- Ensure cookie is not undefined
//   const cookie = signupResponse.get('Set-Cookie');
//   if (!cookie || cookie.length === 0) {
//     throw new Error("Cookie is missing from signup response");
//   }

//   // -- Request with valid cookie
//   const response = await request(app)
//     .get('/api/auth/current-user')
//     .set('Cookie', cookie) // ✅ Ensure cookie is defined
//     .expect(200);

//   expect(response.body.currentUser.username).toEqual(username);
// });

// // 2) Responds with `null` when no cookie is included in the request
// it('responds with currentUser of null when no cookie included in request', async () => {
//   const response = await request(app)
//     .get('/api/auth/current-user')
//     .expect(200);

//   expect(response.body.currentUser).toBeNull();
// });

import { it, expect } from '@jest/globals'; // Explicitly import Jest globals
import request from 'supertest';
import { app } from '../app';

// 1) Test: responds with the correct user if cookie exists and is valid
it('responds with the correct user if cookie exists and is valid', async () => {
  const username = 'testUser';
  const password = 'testPW';

  // Sign up a user
  const signupResponse = await request(app)
    .post('/api/auth/signup')
    .send({ username, password })
    .expect(201);

  // Get the cookie from the response and ensure it is defined
  const cookie = signupResponse.get('Set-Cookie');
  if (!cookie || cookie.length === 0) {
    throw new Error("Cookie is missing from signup response");
  }

  // Request current user with the cookie
  const response = await request(app)
    .get('/api/auth/current-user')
    .set('Cookie', cookie)
    .expect(200);

  expect(response.body.currentUser.username).toEqual(username);
});

// 2) Test: responds with currentUser of null when no cookie is included
it('responds with currentUser of null when no cookie included in request', async () => {
  const response = await request(app)
    .get('/api/auth/current-user')
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
