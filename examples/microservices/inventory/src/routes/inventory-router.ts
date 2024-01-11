import express from 'express';
import { getAllItems, updateItemInventory } from '../controllers/inventory-controllers';
import { currentUser } from '@chronosrx/common';

const router = express.Router();

// router.post('/', async (req, res) => {
//     const { event } = req.body;

// });
router.use(currentUser);
router.get('/getAllItems', getAllItems);
// router.get('/getMyItems', getMyItems);

router.patch('/updateItemInventory', updateItemInventory);

export default router;
