// // // import request from 'supertest';
// // // import { app } from '../app';
// // // import { User } from '../models/user';

// // // it('fails with 400 if no username/password provided', async () => {
// // //   await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       password: 'wheremyname',
// // //     })
// // //     .expect(400);

// // //   await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       username: 'wheremypassword',
// // //     })
// // //     .expect(400);
// // // });

// // // it('fails with 400 with invalid password', async () => {
// // //   await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       username: 'validuser',
// // //       password: 'b',
// // //     })
// // //     .expect(400);
// // // });

// // // it('Does not allow duplicate username signup ', async () => {
// // //   await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       username: 'test',
// // //       password: 'test',
// // //     })
// // //     .expect(201);

// // //   await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       username: 'test',
// // //       password: 'test',
// // //     })
// // //     .expect(400);
// // // });

// // // it('creates a user with valid inputs', async () => {
// // //   await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       username: 'test',
// // //       password: 'test',
// // //     })
// // //     .expect(201);

// // //   const users = await User.find({});
// // //   expect(users[0].username).toEqual('test');
// // // });

// // // it('Sets a cookie on successful signup', async () => {
// // //   const response = await request(app)
// // //     .post('/api/auth/signup')
// // //     .send({
// // //       username: 'test',
// // //       password: 'test',
// // //     })
// // //     .expect(201);

// // //   expect(response.get('Set-Cookie')).toBeDefined();
// // //   expect(response.get('Set-Cookie')[0].split('=')[0]).toEqual('token');
// // // });
// // import request from 'supertest';
// // import { app } from '../app';
// // import { User } from '../models/user';

// // it('fails with 400 if no username/password provided', async () => {
// //   await (request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       password: 'wheremyname',
// //     }) as any)
// //     .expect(400);

// //   await (request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'wheremypassword',
// //     }) as any)
// //     .expect(400);
// // });

// // it('fails with 400 with invalid password', async () => {
// //   await (request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'validuser',
// //       password: 'b',
// //     }) as any)
// //     .expect(400);
// // });

// // it('Does not allow duplicate username signup ', async () => {
// //   await (request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'test',
// //       password: 'test',
// //     }) as any)
// //     .expect(201);

// //   await (request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'test',
// //       password: 'test',
// //     }) as any)
// //     .expect(400);
// // });

// // it('creates a user with valid inputs', async () => {
// //   await (request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'test',
// //       password: 'test',
// //     }) as any)
// //     .expect(201);

// //   const users = await User.find({});
// //   expect(users[0].username).toEqual('test');
// // });

// // it('Sets a cookie on successful signup', async () => {
// //   const response = await (request(app)
// //     .post('/api/auth/signup')
// //     .send({
// //       username: 'test',
// //       password: 'test',
// //     }) as any)
// //     .expect(201);

// //   const setCookie = response.get('Set-Cookie');
// //   if (!setCookie || setCookie.length === 0) {
// //     throw new Error('Set-Cookie header not found in response');
// //   }
// //   expect(setCookie[0].split('=')[0]).toEqual('token');
// // });
// import request from 'supertest';
// import { app } from '../app';
// import { User } from '../models/user';

// it('fails with 400 if no username/password provided', async () => {
//   await (request(app)
//     .post('/api/auth/signup')
//     .send({
//       password: 'wheremyname',
//     }) as any).expect(400);

//   await (request(app)
//     .post('/api/auth/signup')
//     .send({
//       username: 'wheremypassword',
//     }) as any).expect(400);
// });

// it('fails with 400 with invalid password', async () => {
//   await (request(app)
//     .post('/api/auth/signup')
//     .send({
//       username: 'validuser',
//       password: 'b',
//     }) as any).expect(400);
// });

// it('Does not allow duplicate username signup', async () => {
//   await (request(app)
//     .post('/api/auth/signup')
//     .send({
//       username: 'test',
//       password: 'test',
//     }) as any).expect(201);

//   await (request(app)
//     .post('/api/auth/signup')
//     .send({
//       username: 'test',
//       password: 'test',
//     }) as any).expect(400);
// });

// it('creates a user with valid inputs', async () => {
//   await (request(app)
//     .post('/api/auth/signup')
//     .send({
//       username: 'test',
//       password: 'test',
//     }) as any).expect(201);

//   const users = await User.find({});
//   expect(users[0].username).toEqual('test');
// });

// it('Sets a cookie on successful signup', async () => {
//   const response = await (request(app)
//     .post('/api/auth/signup')
//     .send({
//       username: 'test',
//       password: 'test',
//     }) as any).expect(201);

//   const setCookie = response.get('Set-Cookie');
//   if (!setCookie || setCookie.length === 0) {
//     throw new Error('Set-Cookie header not found in response');
//   }
//   expect(setCookie[0].split('=')[0]).toEqual('token');
// });

import { it, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../app';
import { User } from '../models/user';

it('fails with 400 if no username/password provided', async () => {
  await (request(app)
    .post('/api/auth/signup')
    .send({ password: 'wheremyname' }) as any)
    .expect(400);

  await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'wheremypassword' }) as any)
    .expect(400);
});

it('fails with 400 with invalid password', async () => {
  await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'validuser', password: 'b' }) as any)
    .expect(400);
});

it('Does not allow duplicate username signup', async () => {
  await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'test', password: 'test' }) as any)
    .expect(201);

  await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'test', password: 'test' }) as any)
    .expect(400);
});

it('creates a user with valid inputs', async () => {
  await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'test', password: 'test' }) as any)
    .expect(201);

  const users = await User.find({});
  expect(users[0].username).toEqual('test');
});

it('Sets a cookie on successful signup', async () => {
  const response = await (request(app)
    .post('/api/auth/signup')
    .send({ username: 'test', password: 'test' }) as any)
    .expect(201);

  const setCookie = response.get('Set-Cookie');
  if (!setCookie || setCookie.length === 0) {
    throw new Error('Set-Cookie header not found in response');
  }
  expect(setCookie[0].split('=')[0]).toEqual('token');
});

