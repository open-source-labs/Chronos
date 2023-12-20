import request from 'supertest';
import { app } from '../app';

it('fails if itemName does not exist', async () => {
  const cookie = await global.login('test');

  await request(app)
    .post('/api/items/createItem')
    .set('Cookie', cookie)
    .send({
      itemName: 'chicken',
      unitPrice: 5,
    })
    .expect(201);

  const response = await request(app)
    .delete('/api/items/deleteItem')
    .send({
      itemName: 'beef',
    })
    .expect(400);
});

it('fails if sellerId does not match appropriate seller', async () => {
  const user1cookie = await global.login('test');
  const user2cookie = await global.login('badguy');
  await request(app)
    .post('/api/items/createItem')
    .set('Cookie', user1cookie)
    .send({
      itemName: 'chicken',
      unitPrice: 5,
    })
    .expect(201);

  await request(app)
    .delete('/api/items/deleteItem')
    .set('Cookie', user2cookie)
    .send({
      itemName: 'chicken',
    })
    .expect(400);
});
