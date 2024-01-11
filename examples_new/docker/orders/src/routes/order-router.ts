import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order-controller';
import { currentUser, requireAuth } from '@chronosrx/common';

const router = express.Router();
router.use(currentUser);
router.use(requireAuth);

router.get('/getAllOrders', getAllOrders);
router.post('/createOrder', createOrder);

export default router;
