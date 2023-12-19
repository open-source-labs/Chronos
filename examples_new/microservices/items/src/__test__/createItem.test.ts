import request from 'supertest';
import { app } from '../app';

it('fails if no itemName or unitPrice are provided', async () => {
  await request(app)
    .post('/api/items/createItem')
    .send({
      itemName: 'missingThePrice',
    })
    .expect(400);

  await request(app)
    .post('/api/items/createItem')
    .send({
      unitPrice: 3,
    })
    .expect(400);
});

it('fails if itemPrice is not a number', async () => {
  await request(app)
    .post('/api/items/createItem')
    .send({
      itemName: 'chicken',
      unitPrice: 'thisShouldBeANumber',
    })
    .expect(400);
});

it('creates a new item with the valid inputs', async () => {
  // LOG SAMPLE COOKIE FOR DEBUGGING global.login() helper fx
  const cookie = global.login()
  console.log('🍪 Sample Cookie', cookie);
  

  await request(app)
    .post('/api/items/createItem')
    // TO SET COOKIE FOR AUTHENTICATED ROUTES
    .set('Cookie', global.login())
    .send({
      itemName: 'chicken',
      unitPrice: 5,
    })
    .expect(201);
});
