import express from 'express';
import {getOrder,getSale,createOrder,deleteOrder} from '../controllers/order-controller';
import { currentUser } from '@chronosrx/common';

const router = express.Router();

router.get('/getMyOrders', getOrder);
router.get('/getMySales', getSale);
router.post('/createOrder', createOrder);
router.delete('/deleteOrder', deleteOrder);

export default router;
