import request from 'supertest';
import { app } from '../app';

it('fails if no itemName or unitPrice are provided', async () => {
  const cookie = await global.login('test');
  await request(app)
    .post('/api/items/createItem')
    .set('Cookie', cookie)
    .send({
      itemName: 'missingPrice',
    })
    .expect(400);

  await request(app)
    .post('/api/items/createItem')
    .set('Cookie', cookie)
    .send({
      unitPrice: 3,
    })
    .expect(400);
});

it('fails if itemPrice is not a number', async () => {
  const cookie = await global.login('test');
  await request(app)
    .post('/api/items/createItem')
    .set('Cookie', cookie)
    .send({
      itemName: 'chicken',
      unitPrice: 'thisShouldBeANumber',
    })
    .expect(400);
});

it('creates a new item with the valid inputs', async () => {
  // LOG SAMPLE COOKIE FOR DEBUGGING global.login() helper fx
  const cookie = await global.login('test');
  console.log(cookie);

  await request(app)
    .post('/api/items/createItem')
    // TO SET COOKIE FOR AUTHENTICATED ROUTES
    .set('Cookie', cookie)
    .send({
      itemName: 'chicken',
      unitPrice: 5,
    })
    .expect(201);
});
