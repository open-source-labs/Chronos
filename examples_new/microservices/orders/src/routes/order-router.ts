import express from 'express';
import { createOrder } from '../controllers/order-controller';
import { currentUser, requireAuth } from '@chronosrx/common';

const router = express.Router();
router.use(currentUser);
router.use(requireAuth);

// router.get('/getMyOrders', getOrder);
router.post('/createOrder', createOrder);
// router.delete('/deleteOrder', deleteOrder);


export default router;
