// import request from 'supertest';
// import { app } from '../app';
// // Mongo Memory Server - Users collection always starts out empty**
// it('success if there is itemid and units', async () => {
//   const itemId = '6581bbc692686e6e68d25d7d';
//   const sellerID = '123123';
//   await global.createItem(itemId);
//   const response = await request(app)
//     .get('/api/orders/getMyOrder')
//     .send({
//       itemId: itemId,
//     })
//     .expect(200);
//   // console.log(response);
//   expect(response.body.units).toEqual(50);
// });

import request from 'supertest';
import { app } from '../app';
console.log(typeof it);

// Mongo Memory Server - Users collection always starts out empty
it('success if there is itemid and units', async () => {
  const itemId = '6581bbc692686e6e68d25d7d';
  const sellerID = '123123';

  // Assuming global.createItem is defined in your test setup
  await global.createItem(itemId);

  const response = await request(app)
    .get('/api/orders/getMyOrder')
    .send({ itemId })
    .expect(200);

  expect(response.body.units).toEqual(50);
});
