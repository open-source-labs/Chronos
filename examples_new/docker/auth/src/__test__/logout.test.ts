import request from 'supertest';
import { app } from '../app';

// Mongo Memory Server - Users collection always starts out empty**

// 1) Clears the cookie on logout
// Means that 'Set-Cookie' header is defined
//200 means request is successful, 201 means request is successful and result generated
it('Clears the cookie on logout', async () => {
  await request(app)
    .post('/api/auth/logout')
    .send({
      username: 'test',
      password: 'test',
    })
    .expect(200);

  const response = await request(app).post('/api/auth/logout').send().expect(200);

  console.log(response.get('Set-Cookie'));
  expect(response.get('Set-Cookie')).toBeDefined();
  // expect(response.get('Set-Cookie')[0].split('=')[0]).toEqual('token');
});
