import express from 'express';
import { getItemInventory, updateItemInventory } from '../controllers/inventory-controllers';

const router = express.Router();

// router.post('/', async (req, res) => {
//     const { event } = req.body;

// });

router.get('/getItemInventory', getItemInventory);
router.patch('/updateItemInventory', updateItemInventory);

export default router;
