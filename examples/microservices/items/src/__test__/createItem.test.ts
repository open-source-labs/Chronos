import request from 'supertest';
import { app } from '../app';


it('creates a new item with the valid inputs', async () => {
  // LOG SAMPLE COOKIE FOR DEBUGGING global.login() helper fx
  const cookie = await global.login('test');
  console.log(cookie);

  await request(app)
    .post('/api/items/createItem')
    .set('Cookie', cookie)
    .send({
      itemName: 'chicken',
    })
    .expect(201);
});
