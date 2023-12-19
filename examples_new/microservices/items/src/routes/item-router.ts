import express from 'express';
import { createItem } from '../controllers/itemController';
import { currentUser, requireAuth } from '@chronosrx/common';

const router = express.Router();

router.use((req, res, next) => {
  console.log('🤯 We Are Here');
  return next();
});
router.use(currentUser);
router.use(requireAuth);
router.post('/createItem', createItem);

export default router;
