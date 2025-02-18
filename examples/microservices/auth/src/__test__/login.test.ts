import request from 'supertest';
import { app } from '../app.js';

// Mongo Memory Server - Users collection always starts out empty

// 1) Fails with bad request error if either username or password is not provided
it('fails if either username or password is not provided', async () => {
  await request(app)
    .post('/api/auth/login')
    .send({
      username: 'AYYYYY',
    })
    .expect(400);

  await request(app)
    .post('/api/auth/login')
    .send({
      password: 'CUH',
    })
    .expect(400);
});

// 2) Fails with bad request error if user does not exist in the database
it('fails if user does not exist', async () => {
  await request(app)
    .post('/api/auth/login')
    .send({
      username: 'nonexistentuser',
      password: 'test',
    })
    .expect(400);
});

// 3) Fails with BadRequest Error if passwords do not match
it('fails if passwords do not match', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      username: 'test',
      password: 'rightTest',
    })
    .expect(201);

  await request(app)
    .post('/api/auth/login')
    .send({
      username: 'test',
      password: 'wrongTest',
    })
    .expect(400);
});

// 4) Succeeds if username and password match a user in the database
it('succeeds when username and password are correct and sets a cookie', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({
      username: 'test',
      password: 'test123',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'test',
      password: 'test123',
    })
    .expect(200);

  // Ensure the Set-Cookie header is always an array
  const cookies = response.get('Set-Cookie') ?? [];

  expect(Array.isArray(cookies)).toBe(true);
  expect(cookies.length).toBeGreaterThan(0);

  // Ensure that the first cookie exists before accessing it
  expect(cookies[0]?.split('=')[0]).toEqual('token');
});
