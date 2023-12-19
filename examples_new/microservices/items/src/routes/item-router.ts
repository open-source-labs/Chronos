import express from 'express';
import { createItem } from '../controllers/itemController';
import { currentUser, requireAuth } from '@chronosrx/common';


const router = express.Router();


router.use(currentUser);
router.use(requireAuth);
router.post('/createItem', createItem);

export default router;
