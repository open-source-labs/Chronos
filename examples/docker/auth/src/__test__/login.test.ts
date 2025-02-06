// // import request from 'supertest';
// // import { app } from '../app';

// // // Mongo Memory Server - Users collection always starts out empty**

// // // 1) Fails with bad request error either username or password are not provided
// // it('fails if either username or password are not provided', async () => {
// //   await request(app)
// //     .post('/api/auth/login')
// //     .send({
// //       username: 'AYYYYY',
// //     })
// //     .expect(400);

// //   await request(app)
// //     .post('/api/auth/login')
// //     .send({
// //       password: 'CUH',
// //     })
// //     .expect(400);
// // });

// // // 2) Fails with bad request error if user does not exist in the database
// // it('user does not exist', async () => {
// //   await request(app)
// //     .post('/api/auth/login')
// //     .send({
// //       username: 'nonexistentuser',
// //       password: 'test',
// //     })
// //     .expect(400);
// // });

// // // 3) Fails with BadRequest Error if passwords do not match
// // it('fails if passwords do not match', async () => {
// //   await request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'test',
// //       password: 'rightTest',
// //     })
// //     .expect(201);

// //   await request(app)
// //     .post('/api/auth/login')
// //     .send({
// //       username: 'test',
// //       password: 'wrongTest',
// //     })
// //     .expect(400);
// // });

// // // 4) Succeeds if username and password match a user in the database
// // it('Users has correct password', async () => {
// //   await request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'test',
// //       password: 'test123',
// //     })
// //     .expect(201);

// //   const response = await request(app)
// //     .post('/api/auth/login')
// //     .send({
// //       username: 'test',
// //       password: 'test123',
// //     })
// //     .expect(200);

// //   expect(response.get('Set-Cookie')).toBeDefined();
// //   expect(response.get('Set-Cookie')[0].split('=')[0]).toEqual('token');
// // });


// import { it, expect } from '@jest/globals';  // Explicitly import Jest globals
// import request from 'supertest';
// import { app } from '../app';

// // Mongo Memory Server - Users collection always starts out empty

// // 1) Fails with bad request error if either username or password are not provided
// it('fails if either username or password are not provided', async () => {
//   await request(app)
//     .post('/api/auth/login')
//     .send({ username: 'AYYYYY' })
//     .expect(400);

//   await request(app)
//     .post('/api/auth/login')
//     .send({ password: 'CUH' })
//     .expect(400);
// });

// // 2) Fails with bad request error if user does not exist in the database
// it('user does not exist', async () => {
//   await request(app)
//     .post('/api/auth/login')
//     .send({ username: 'nonexistentuser', password: 'test' })
//     .expect(400);
// });

// // 3) Fails with BadRequest Error if passwords do not match
// it('fails if passwords do not match', async () => {
//   await request(app)
//     .post('/api/auth/signup')
//     .send({ username: 'test', password: 'rightTest' })
//     .expect(201);

//   await request(app)
//     .post('/api/auth/login')
//     .send({ username: 'test', password: 'wrongTest' })
//     .expect(400);
// });

// // 4) Succeeds if username and password match a user in the database
// it('Users has correct password', async () => {
//   await request(app)
//     .post('/api/auth/signup')
//     .send({ username: 'test', password: 'test123' })
//     .expect(201);

//   const response = await request(app)
//     .post('/api/auth/login')
//     .send({ username: 'test', password: 'test123' })
//     .expect(200);

//   expect(response.get('Set-Cookie')).toBeDefined();
//   expect(response.get('Set-Cookie')[0].split('=')[0]).toEqual('token');
// });
import { it, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../app';

// 1) Fails if either username or password are not provided
it('fails if either username or password are not provided', async () => {
  await (request(app)
    .post('/api/auth/login')
    .send({ username: 'AYYYYY' }) as any)
    .expect(400);

  await (request(app)
    .post('/api/auth/login')
    .send({ password: 'CUH' }) as any)
    .expect(400);
});

// 2) Fails if user does not exist in the database
it('user does not exist', async () => {
  await (request(app)
    .post('/api/auth/login')
    .send({ username: 'nonexistentuser', password: 'test' }) as any)
    .expect(400);
});

// 3) Fails if passwords do not match
it('fails if passwords do not match', async () => {
  // Sign up a user first
  await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'test', password: 'rightTest' }) as any)
    .expect(201);

  // Attempt to log in with a wrong password
  await (request(app)
    .post('/api/auth/login')
    .send({ username: 'test', password: 'wrongTest' }) as any)
    .expect(400);
});

// 4) Succeeds if username and password match a user in the database
it('Users has correct password', async () => {
  // Sign up the user first
  await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'test', password: 'test123' }) as any)
    .expect(201);

  // Log in with the same credentials
  const response = await (request(app)
    .post('/api/auth/login')
    .send({ username: 'test', password: 'test123' }) as any)
    .expect(200);

  // Ensure that the Set-Cookie header exists
  const setCookie = response.get('Set-Cookie');
  if (!setCookie || setCookie.length === 0) {
    throw new Error('Set-Cookie header not found in response');
  }

  // Validate that the cookie name is 'token'
  const tokenCookie = setCookie[0];
  const cookieName = tokenCookie.split('=')[0];
  expect(cookieName).toEqual('token');
});
