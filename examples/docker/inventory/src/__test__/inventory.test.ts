// // import request from 'supertest';
// // import { app } from '../app';

// // // Mongo Memory Server - Users collection always starts out empty**

// // //fails where there is no unit or no item id, it should return item
// // // it('fails if item id or units are missing', async () => {
// // //   await request(app)
// // //     .get('/api/inventory/getItemInventory')
// // //     .send({
// // //       itemId: '6581bbc692686e6e68d25d7d',
// // //     })
// // //     .expect(400);
// // //   await request(app)
// // //     .get('/api/inventory/getItemInventory')
// // //     .send({
// // //       units: 50,
// // //     })
// // //     .expect(400);
// // // });
// // // it('success if there is itemid and units', async () => {
// // //   const itemId = '6581bbc692686e6e68d25d7d';
// // //   await global.createItem(itemId);
// // //   const response = await request(app)
// // //     .get('/api/inventory/getItemInventory')
// // //     .send({
// // //       itemId: itemId,
// // //     })
// // //     .expect(200);
// // //   console.log(response);
// // //   expect(response.body.units).toEqual(50);
// // // });
// // //testing updateItemInventory route, fail if id or units are missing
// // // it('fails if item id or units are missing when trying to update', async () => {
// // //   await request(app)
// // //     .patch('/api/inventory/updateItemInventory')
// // //     .send({
// // //       itemId: '6581bbc692686e6e68d25d7d',
// // //     })
// // //     .expect(400);
// // //   await request(app)
// // //     .patch('/api/inventory/updateItemInventory')
// // //     .send({
// // //       units: 50,
// // //     })
// // //     .expect(400);
// // // });
// // it('successful updated the item with updated units', async () => {
// //   const itemId = '6581bbc692686e6e68d25d7d';
// //   await global.createItem(itemId);

// //   const response = await request(app)
// //     .patch('/api/inventory/updateItemInventory')
// //     .send({
// //       itemId: itemId,
// //       units: 40,
// //     })
// //     .expect(200);
// //   console.log(response);
// //   expect(response.body.units).toEqual(40);
// // });
// import request from 'supertest';
// import { app } from '../app';

// // Uncomment or remove the commented tests as needed

// // it('fails if item id or units are missing when trying to update', async () => {
// //   await (request(app)
// //     .patch('/api/inventory/updateItemInventory')
// //     .send({
// //       itemId: '6581bbc692686e6e68d25d7d',
// //     }) as any)
// //     .expect(400);
// //   await (request(app)
// //     .patch('/api/inventory/updateItemInventory')
// //     .send({
// //       units: 50,
// //     }) as any)
// //     .expect(400);
// // });

// it('successful updated the item with updated units', async () => {
//   const itemId = '6581bbc692686e6e68d25d7d';
//   await global.createItem(itemId);

//   const response = await (request(app)
//     .patch('/api/inventory/updateItemInventory')
//     .send({
//       itemId: itemId,
//       units: 40,
//     }) as any)
//     .expect(200);

//   console.log(response);
//   expect(response.body.units).toEqual(40);
// });
// import request from 'supertest';
// import { app } from '../app';

// it('successful updated the item with updated units', async () => {
//   const itemId = '6581bbc692686e6e68d25d7d';

//   // Ensure the item exists by creating it via a global helper function.
//   await global.createItem(itemId);

//   const response = await (request(app)
//     .patch('/api/inventory/updateItemInventory')
//     .send({ itemId, units: 40 }) as any)
//     .expect(200);

//   console.log(response);
//   expect(response.body.units).toEqual(40);
// });
// import { it, expect } from '@jest/globals'; // <-- Ensure proper Jest types
// import request from 'supertest';
// import { app } from '../app';

// it('successful updated the item with updated units', async () => {
//   const itemId = '6581bbc692686e6e68d25d7d';
  
//   // Ensure the item exists by creating it (global.createItem should be defined in your setup)
//   await global.createItem(itemId);

//   // Cast to 'any' to bypass any overload issues with .expect
//   const response = await (request(app)
//     .patch('/api/inventory/updateItemInventory')
//     .send({ itemId, units: 40 }) as any)
//     .expect(200);

//   expect(response.body.units).toEqual(40);
// });
import { it, expect } from '@jest/globals'; // Ensure proper Jest types are used
import request from 'supertest';
import { app } from '../app';

it('successful updated the item with updated units', async () => {
  const itemId = '6581bbc692686e6e68d25d7d';

  // Ensure the item exists via a global helper function.
  // (Make sure that global.createItem is defined in your test setup.)
  await global.createItem(itemId);

  // Cast the request chain to any to bypass overload issues with .expect()
  const response = await (request(app)
    .patch('/api/inventory/updateItemInventory')
    .send({ itemId, units: 40 }) as any)
    .expect(200);

  expect(response.body.units).toEqual(40);
});
