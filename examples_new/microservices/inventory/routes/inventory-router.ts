import express from 'express';
import { getItemInventory, updateItemInventory } from '../controllers/inventory-controllers';
import { currentUser } from '@chronosrx/common';
const router = express.Router();

router.get('/getItemInventory', getItemInventory);
router.patch('/updateItemInventory', updateItemInventory);
router.get('/current-user', currentUser, getCurrentUser);

export default router;
