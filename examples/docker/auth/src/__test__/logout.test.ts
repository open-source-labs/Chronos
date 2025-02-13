// // import request from 'supertest';
// // import { app } from '../app';

// // // Mongo Memory Server - Users collection always starts out empty**

// // // 1) Clears the cookie on logout
// // // Means that 'Set-Cookie' header is defined
// // //200 means request is successful, 201 means request is successful and result generated
// // it('Clears the cookie on logout', async () => {
// //   await request(app)
// //     .post('/api/auth/logout')
// //     .send({
// //       username: 'test',
// //       password: 'test',
// //     })
// //     .expect(200);

// //   const response = await request(app).post('/api/auth/logout').send().expect(200);

// //   console.log(response.get('Set-Cookie'));
// //   expect(response.get('Set-Cookie')).toBeDefined();
// //   // expect(response.get('Set-Cookie')[0].split('=')[0]).toEqual('token');
// // });

// import request from 'supertest';
// import { app } from '../app';

// it('Clears the cookie on logout', async () => {
//   // First call to logout with sample data (if needed)
//   await (request(app)
//     .post('/api/auth/logout')
//     .send({
//       username: 'test',
//       password: 'test',
//     }) as any)
//     .expect(200);

//   // Second call to logout
//   const response = await (request(app)
//     .post('/api/auth/logout')
//     .send() as any)
//     .expect(200);

//   console.log(response.get('Set-Cookie'));
//   expect(response.get('Set-Cookie')).toBeDefined();
//   // Optionally, you can assert on the cleared cookie pattern:
//   // expect(response.get('Set-Cookie')[0]).toContain('token=;');
// });

import { it, expect } from '@jest/globals'; // Explicitly import Jest globals
import request from 'supertest';
import { app } from '../app';

it('Clears the cookie on logout', async () => {
  // First, call the logout endpoint with sample data (if your endpoint expects data)
  await (request(app)
    .post('/api/auth/logout')
    .send({
      username: 'test',
      password: 'test',
    }) as any)
    .expect(200);

  // Then, make another request to logout (or check cookie clearing behavior)
  const response = await (request(app)
    .post('/api/auth/logout')
    .send() as any)
    .expect(200);

  console.log(response.get('Set-Cookie'));
  expect(response.get('Set-Cookie')).toBeDefined();
  // Optionally, uncomment the next line if you want to check for a cleared cookie pattern:
  // expect(response.get('Set-Cookie')[0]).toContain('token=;');
});
