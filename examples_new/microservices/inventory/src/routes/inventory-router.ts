import express from 'express';
import { getAllItems, updateItemInventory, getMyItems } from '../controllers/inventory-controllers';

const router = express.Router();

// router.post('/', async (req, res) => {
//     const { event } = req.body;

// });

router.get('/getAllItems', getAllItems);
router.get('/getMyItems', getMyItems);
router.patch('/updateItemInventory', updateItemInventory);

export default router;
